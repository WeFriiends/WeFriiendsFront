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
            Search preferences
          </Typography>
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
    [theme.breakpoints.up('md')]: {
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
    order: 2,
    [theme.breakpoints.up('md')]: {
      order: 1,
      width: 350,
    },
  },
  twoColumnLayoutColRight: {
    width: 350,
    maxWidth: '100%',
    order: 1,
    [theme.breakpoints.up('sm')]: {
      width: 450,
    },
    [theme.breakpoints.up('md')]: {
      width: 450,
      order: 2,
    },
  },

  title: {
    paddingTop: 60,
    paddingBottom: 10,
    textAlign: 'left',
    fontSize: 24,
    fontWeight: 500,
    [theme.breakpoints.up('lg')]: {
      paddingTop: 0,
      paddingBottom: 20,
      textAlign: 'left',
      fontSize: 24,
      fontWeight: 500,
    },
  },
  noBottomMargin: {
    marginBottom: 0,
  },
  descriptionSlider: {
    lineHeight: 1.3,
  },
  settingsItem: {
    marginBottom: 30,
  },
})
