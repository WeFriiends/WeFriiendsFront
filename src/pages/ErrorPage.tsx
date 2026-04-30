import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import theme from '../styles/createTheme'
import { commonStyles } from '../styles/commonStyles'
import { ERROR_CONTENT } from 'data/errorContent'
import PrimaryButton from 'common/components/PrimaryButton'
import { ErrorIcon } from 'common/svg/ErrorIcon'

type ErrorPageProps = {
  code?: number
  message?: string
  onRetry?: () => void
}

const ErrorPage: React.FC<ErrorPageProps> = ({ code, message, onRetry }) => {
  const commonClasses = commonStyles().classes
  const { classes } = useStyles()
  const [imgError, setImgError] = useState(false)

  const content =
    code && code in ERROR_CONTENT
      ? ERROR_CONTENT[code as keyof typeof ERROR_CONTENT]
      : ERROR_CONTENT.default

  return (
    <Box className={commonClasses.centeredFullPage}>
      <Box className={classes.wrapper}>
        <Typography variant="h1" className={classes.label}>
          Error
        </Typography>

        {content.showCode && code && (
          <Typography className={classes.errorCode}>{code}</Typography>
        )}

        {content.title && (
          <Typography variant="h3" className={classes.title}>
            {message || content.title}
          </Typography>
        )}

        <Typography variant="h3" className={classes.subtitle}>
          {content.subtitle}
        </Typography>

        {imgError || !content.img ? (
          <ErrorIcon />
        ) : (
          <img
            src={content.img}
            alt={`Error ${code || ''}`}
            onError={() => setImgError(true)}
          />
        )}

        {content.footer && (
          <Typography variant="h3" className={classes.footer}>
            {content.footer}
          </Typography>
        )}

        {onRetry && (
          <PrimaryButton
            label={content.buttonText}
            onClickHandler={onRetry}
            className={classes.retryBtn}
          />
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    lineHeight: 1,
    color: theme.palette.primary.light,
  },
  errorCode: {
    fontSize: 60,
    fontWeight: 600,
    lineHeight: 1,
    paddingTop: 8,
    color: theme.palette.primary.dark,
  },
  title: {
    lineHeight: '30px',
    marginTop: 6,
    color: theme.palette.primary.light,
  },
  subtitle: {
    maxWidth: 279,
    marginTop: 64,
    marginBottom: 30,
  },
  footer: {
    marginTop: 15,
  },
  retryBtn: {
    height: 60,
    marginTop: 80,
    marginInline: 45,
  },
}))
