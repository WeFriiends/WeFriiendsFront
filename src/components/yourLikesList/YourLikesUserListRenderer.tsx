import React from 'react'
import { Box, ImageList, ImageListItem, Typography } from '@mui/material'
import { UserObjectType } from '../../common/types/userTypes'
import { nearByWhoLikedMeStyles } from '../../styles/nearByWhoLikedMeStyles'
import NoticeNoLikes from '../noticeNoData/NoticeNoLikes'
import IconLightning from '../../common/svg/IconLightning'

type UserListRendererProps = {
  users?: UserObjectType[]
}

const YourLikesUserListRenderer: React.FC<UserListRendererProps> = ({
  users,
}) => {
  const { classes } = nearByWhoLikedMeStyles()
  const currentUserID = localStorage.getItem('userId') || '1' //will remove '1'
  const likesCurrentUser = users?.filter(
    (user) => currentUserID && user.likedUsers.includes(currentUserID)
  )

  if (!likesCurrentUser?.length) {
    return <NoticeNoLikes />
  }

  return (
    <ImageList gap={0} className={classes.imageList}>
      {likesCurrentUser?.map((user) => (
        <ImageListItem key={user.id} className={classes.imageListItem}>
          <Box className={classes.profileBoxPosition}>
            <Box className={classes.userImagesWrapper}>
              <img
                className={classes.userImages}
                src={user.picture}
                alt="Profile photo"
              />
            </Box>
            <Box className={classes.lightingIconPosition}>
              <IconLightning />
            </Box>
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
export default YourLikesUserListRenderer
