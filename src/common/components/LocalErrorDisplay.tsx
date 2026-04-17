import { Box, Typography, Button } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

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
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    textAlign: 'center',
  },
  title: {
    color: theme.palette.primary.light,
  },
  message: {
    color: theme.palette.primary.dark,
  },
}))
