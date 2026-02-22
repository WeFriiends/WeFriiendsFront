import { Link } from 'react-router-dom'
import { Box } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

export function LogoLink() {
  const { classes } = useStyles()
  return (
    <Box className={classes.logo} component={Link} to="/friends">
      <Box
        component="img"
        src="/img/logo.svg"
        alt="logo"
        className={classes.img}
      />
    </Box>
  )
}

const useStyles = makeStyles()((theme) => ({
  logo: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  img: {
    height: 36,
    [theme.breakpoints.up('lg')]: {
      height: 50,
    },
  },
}))
