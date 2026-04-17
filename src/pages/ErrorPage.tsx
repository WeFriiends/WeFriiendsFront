import { Box, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import theme from '../styles/createTheme'
import { commonStyles } from '../styles/commonStyles'
import { ERROR_CONTENT } from 'data/errorContent'
import PrimaryButton from 'common/components/PrimaryButton'

type ErrorPageProps = {
  code?: number
  message?: string
  onRetry?: () => void
}

const ErrorPage: React.FC<ErrorPageProps> = ({ code, message, onRetry }) => {
  const commonClasses = commonStyles().classes
  const { classes } = useStyles()

  const content =
    code && code in ERROR_CONTENT
      ? ERROR_CONTENT[code as keyof typeof ERROR_CONTENT]
      : ERROR_CONTENT.default

  return (
    <Box className={commonClasses.centeredFullPage}>
      <Box className={classes.wrapper}>
        <Typography variant="h1" className={classes.title}>
          Error
          {code && <span className={classes.errorCode}>{code}</span>}
        </Typography>

        <Typography variant="h3" className={classes.errorDescription}>
          {message || content.title}
        </Typography>

        <Typography variant="h3" className={classes.subtitle}>
          {content.subtitle}
        </Typography>

        <img
          src={content.img}
          alt={`Error ${code || ''}`}
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />

        {content.footer && (
          <Typography variant="h3" className={classes.footer}>
            {content.footer}
          </Typography>
        )}

        {onRetry && (
          <PrimaryButton label={content.buttonText} onClickHandler={onRetry} />
        )}
      </Box>
    </Box>
  )
}

export default ErrorPage

const useStyles = makeStyles()(() => ({
  wrapper: {
    maxWidth: 287,
    textAlign: 'center',
  },
  title: {
    lineHeight: 1,
    paddingBottom: 0,
    color: theme.palette.primary.light,
  },
  errorCode: {
    display: 'block',
    paddingTop: 10,
    fontSize: 60,
    color: theme.palette.primary.main,
  },
  errorDescription: {
    lineHeight: '30px',
    marginTop: 6,
    marginBottom: 64,
    color: theme.palette.primary.light,
  },
  subtitle: {
    maxWidth: 279,
    marginBottom: 15,
  },
  footer: {
    marginTop: 15,
  },
  retryBtn: {
    marginTop: 80,
    height: 60,
    width: 250,
  },
}))
