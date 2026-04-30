import { Box, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

interface InfoBarProps {
  title: string
  subTitle: string
}

export function InfoBar({ title, subTitle }: InfoBarProps) {
  const { classes } = useStyles()
  return (
    <Box className={classes.container}>
      <Typography variant="h1" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="body2">{subTitle}</Typography>
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
    fontSize: 32,
    fontWeight: 600,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 60,
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: 0,
      paddingBottom: 20,
      fontSize: 24,
      fontWeight: 500,
    },
  },
}))
