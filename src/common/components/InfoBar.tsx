import { Box, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

interface InfoBarProps {
  title: string
  subTitle: string
}

export function InfoBar({ title, subTitle: subTitle }: InfoBarProps) {
  const { classes } = useStyles()
  return (
    <Box className={classes.container}>
      <Typography variant="h1" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="body2" className={classes.description}>
        {subTitle}
      </Typography>
    </Box>
  )
}

const useStyles = makeStyles()((theme) => ({
  container: {
    marginBottom: 30,
  },
  title: {
    paddingTop: 30,
    paddingBottom: 10,
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 600,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 60,
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: 0,
      paddingBottom: 20,
      textAlign: 'left',
      fontSize: 24,
      fontWeight: 500,
    },
  },
  description: {
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '320px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
}))
