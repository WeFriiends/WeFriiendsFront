import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Badge, BottomNavigationAction } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import theme from '../../styles/createTheme'

interface NavigationLink {
  to: string
  icon: FC<IconProps>
  isActive: boolean
}

export function NavigationLink({ to, icon: Icon, isActive }: NavigationLink) {
  const { classes } = useStyles()

  const linkIcon = (
    <Badge invisible>
      <Icon
        color={
          isActive
            ? theme.palette.primary.main
            : theme.customPalette.colorNavIcon
        }
      />
    </Badge>
  )

  return (
    <BottomNavigationAction
      className={classes.link}
      component={Link}
      to={to}
      icon={linkIcon}
      disableRipple
      disableTouchRipple
    />
  )
}

const useStyles = makeStyles()((theme) => ({
  link: {
    margin: 0,
    padding: 0,
    width: 50,
    minWidth: 50,
    '&:hover svg path': {
      fill: theme.palette.primary.main,
    },
    '& svg': {
      width: '100%',
      height: 40,
    },
    '&:last-child': {
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    [theme.breakpoints.down('md')]: {
      '& svg': {
        height: 30,
      },
    },
    [theme.breakpoints.down('sm')]: {
      '& svg': {
        height: 25,
      },
    },
  },
}))
