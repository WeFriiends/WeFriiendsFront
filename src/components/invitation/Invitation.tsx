import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import theme from '../../styles/createTheme'

const Invitation = () => {
  const { classes } = useStyles()

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h1" className={classes.title}>
          Invite
        </Typography>
        <Box
          className={classes.imageWrapper}
          component="img"
          src="/img/invite/qr-invite.svg"
        ></Box>
        <Typography variant="body2" className={classes.description}>
          Feel free to invite someone, who can be interesting in finding friends
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Invitation

const useStyles = makeStyles()(() => ({
  title: {
    textAlign: 'center',
    paddingBottom: '50px',
    paddingTop: '60px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '290px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  description: {
    textAlign: 'center',
    paddingTop: '60px',
    paddingRight: '20px',
    paddingLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '360px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  imageWrapper: {
    display: 'block',
    margin: '0 auto',
    width: '220px',
    maxWidth: '100%',
    boxSizing: 'border-box',
    borderRadius: '25px',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.primary.light,
  },
}))
