import { Box } from '@mui/material'
import Logo from '../logo/Logo'
import { makeStyles } from 'tss-react/mui'
import theme from '../../styles/createTheme'
import React, { ReactNode } from 'react'

type AuthPagesWrapperProps = {
  width?: 580
  children: ReactNode
}

const AuthPagesWrapper: React.FC<AuthPagesWrapperProps> = ({
  width,
  children,
}) => {
  const { classes } = useStyles()
  return (
    <Box className={classes.authWrapper}>
      <Box
        className={classes.authContent}
        sx={{ maxWidth: width ? width : 390 }}
      >
        <Logo />
        {children}
      </Box>
    </Box>
  )
}
export default AuthPagesWrapper

const useStyles = makeStyles()({
  authWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  authContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '50px 20px',
    width: '100%',
    [theme.breakpoints.up(390)]: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      margin: '0 auto',
      maxHeight: '100%',
      minHeight: 650,
    },
    '@media (max-height: 750px)': {
      position: 'static',
      transform: 'none',
    },
  },
})
