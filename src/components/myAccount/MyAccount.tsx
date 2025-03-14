import * as React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import theme from '../../styles/createTheme'
import HelpAndSupport from './HelpAndSupport'
import MyProfile from './MyProfile'
import DistanceControl from './DistanceControl'
import LocationControl from './LocationControl'
import AgeRangeControl from './AgeRangeControl'

const MyAccount: React.FC = () => {
  const { classes } = useStyles()

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} className={classes.twoColumnLayoutWrapper}>
        <Box className={classes.twoColumnLayoutColLeft}>
          <Typography variant="h1" className={classes.title}>
            My account
          </Typography>
          <Box className={classes.settingsDescription}>
            <Typography variant="h2" className={classes.subtitle}>
              Settings
            </Typography>
            <Typography variant="body2" className={classes.description}>
              Indicate what is important to you <br />
              and we will show you the best options.
            </Typography>
          </Box>
          <Box className={classes.settingsItem}>
            <LocationControl />
            <br />
            <br />
            <DistanceControl />
          </Box>
          <Box className={classes.settingsItem}>
            <AgeRangeControl />
          </Box>
          <HelpAndSupport />
        </Box>
        <Box className={classes.twoColumnLayoutColRight}>
          <MyProfile />
        </Box>
      </Grid>
    </Grid>
  )
}

export default MyAccount

const useStyles = makeStyles()({
  twoColumnLayoutWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'column',
    paddingBottom: 100,
    [theme.breakpoints.up(850)]: {
      alignItems: 'start',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    [theme.breakpoints.up('lg')]: {
      paddingBottom: 0,
    },
  },
  twoColumnLayoutColLeft: {
    width: 350,
    marginBottom: 50,
    maxWidth: '100%',
    [theme.breakpoints.up(850)]: {
      width: 350,
    },
  },
  twoColumnLayoutColRight: {
    width: 450,
    maxWidth: '100%',
    overflow: 'auto',
    [theme.breakpoints.up(850)]: {
      width: 450,
    },
  },

  title: {
    paddingTop: 60,
    paddingBottom: 10,
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 600,
    [theme.breakpoints.up('lg')]: {
      paddingTop: 0,
      paddingBottom: 20,
      textAlign: 'left',
      fontSize: 24,
      fontWeight: 500,
    },
  },
  subtitle: {
    fontSize: 16,
    lineHeight: '22px',
    marginTop: 15,
    marginBottom: 20,
  },
  noBottomMargin: {
    marginBottom: 0,
  },
  description: {
    lineHeight: 1.3,
    marginBottom: 30,
  },
  descriptionSlider: {
    lineHeight: 1.3,
  },
  settingsDescription: {
    marginBottom: 50,
  },
  settingsItem: {
    marginBottom: 30,
  },
})
