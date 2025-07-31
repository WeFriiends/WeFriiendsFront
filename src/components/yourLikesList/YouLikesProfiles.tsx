import { Grid, Typography } from '@mui/material'
import UserListRenderer from './YourLikesUserListRenderer'
import useUsersData from 'hooks/useUsersData'
import { makeStyles } from 'tss-react/mui'
import theme from '../../styles/createTheme'

const YouLikesProfiles = () => {
  const { data: profilesList } = useUsersData()
  const { classes } = useStyles()

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h1" className={classes.title}>
          Your likes list
        </Typography>
        <Typography variant="body2" className={classes.description}>
          These people have already liked you – just like them back and it’s a
          match!
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <UserListRenderer users={profilesList} />
      </Grid>
    </Grid>
  )
}
export default YouLikesProfiles

const useStyles = makeStyles()({
  title: {
    paddingTop: 30,
    paddingBottom: 10,
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 600,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 60,
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: 0,
      paddingBottom: 20,
      textAlign: 'left',
      fontSize: 24,
      fontWeight: 500,
    },
  },
  description: {
    textAlign: 'center',
    marginBottom: 30,
    [theme.breakpoints.up('lg')]: {
      textAlign: 'left',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '320px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
})
