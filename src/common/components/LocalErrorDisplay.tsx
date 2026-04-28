import { Box, Typography, Button } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { ErrorIcon } from 'common/svg/ErrorIcon'

interface LocalErrorDisplayProps {
  title?: string
  message: string
  onRetry?: () => void
}

export const LocalErrorDisplay = ({
  title,
  message,
  onRetry,
}: LocalErrorDisplayProps) => {
  const { classes } = useStyles()

  return (
    <Box className={classes.wrapper}>
      {title && (
        <Typography variant="h2" className={classes.title}>
          {title}
        </Typography>
      )}
      <Typography variant="h3" className={classes.message}>
        {message}
      </Typography>
      <Box className={classes.imageWrapper}>
        <ErrorIcon />
      </Box>
      {onRetry && (
        <Button variant="outlined" onClick={onRetry} sx={{ borderRadius: 2 }}>
          Retry
        </Button>
      )}
    </Box>
  )
}

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    maxWidth: 287,
    padding: theme.spacing(4),
    marginInline: 'auto',
    gap: theme.spacing(2),
    textAlign: 'center',
  },
  imageWrapper: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    '& svg': {
      width: '100%',
      maxWidth: 240,
      height: 'auto',
    },
  },
  title: {
    color: theme.palette.primary.light,
  },
  message: {
    color: theme.palette.primary.dark,
  },
}))
