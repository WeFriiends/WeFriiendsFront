import React from 'react'
import { Box, ImageList, ImageListItem, Typography } from '@mui/material'
import { UserObjectType } from '../../common/types/userTypes'
import { nearByWhoLikedMeStyles } from '../../styles/nearByWhoLikedMeStyles'
import NoticeNoUsers from '../noticeNoData/NoticeNoUsers'
import IconLightning from '../../common/svg/IconLightning'

type UserListRendererProps = {
  users?: UserObjectType[]
}

const UserListRenderer: React.FC<UserListRendererProps> = ({ users }) => {
  const { classes } = nearByWhoLikedMeStyles()
  const currentUserID = '1' //take it from localStorage

  if (!users?.length) {
    return <NoticeNoUsers />
  }

  return (
    <ImageList gap={0} className={classes.imageList}>
      {users
        .filter((user) => user.location === 'Istanbul')
        .map((user) => (
          <ImageListItem key={user.id} className={classes.imageListItem}>
            <Box className={classes.profileBoxPosition}>
              <Box className={classes.userImagesWrapper}>
                <img
                  className={classes.userImages}
                  src={user.picture}
                  alt="Profile photo"
                />
              </Box>
              {user.likedUsers.includes(currentUserID) && (
                <Box className={classes.lightingIconPosition}>
                  <IconLightning />
                </Box>
              )}
              <Box component="aside">
                <h4 className={classes.usernameStyling}>{user.name}</h4>
                <Box className={classes.distanceBoxPosition}>
                  <img src="/img/icon-location.svg" alt="distance" />
                  <Typography className={classes.locationTextStyle}>
                    1 km
                  </Typography>
                </Box>
              </Box>
            </Box>
          </ImageListItem>
        ))}
    </ImageList>
  )
}

export default UserListRenderer
