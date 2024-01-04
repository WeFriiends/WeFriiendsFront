import { Grid, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { getColumns } from '../../helpers/helper'
import UserListRenderer from './YourLikesUserListRenderer'
import useUsersData from 'hooks/useUsersData'
type IsMobileProps = {
  isMobile: boolean
}

const YouLikesProfiles = ({ isMobile }: IsMobileProps) => {
  const { classes } = useStyles()
  const columns = getColumns(isMobile)
  const txtAlign = isMobile ? 'center' : 'left'

  const { data: profilesList } = useUsersData()

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography className={classes.headerNear} sx={{ textAlign: txtAlign }}>
          Your likes list
        </Typography>
        <Typography
          className={classes.description}
          sx={{ textAlign: txtAlign }}
        >
          These people have already liked you – just like them back and it’s a
          match!
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <UserListRenderer
          users={profilesList}
          classes={classes}
          columns={columns}
        />
      </Grid>
    </Grid>
  )
}
export default YouLikesProfiles
const useStyles = makeStyles()(() => {
  return {
    headerNear: {
      color: '#F1562A',
      fontSize: 32,
      fontFamily: 'Inter',
      fontWeight: '600',
    },
    description: {
      width: '100%',
      color: 'black',
      fontSize: 14,
      fontFamily: 'Inter',
      fontWeight: '400',
      wordWrap: 'break-word',
    },
    userImages: {
      borderRadius: '50%',
      width: '100px',
      height: '100px',
    },
  }
})
