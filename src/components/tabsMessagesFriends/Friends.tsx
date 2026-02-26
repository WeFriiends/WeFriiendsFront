import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import classnames from 'classnames'
import { UserProfileData } from '../../types/UserProfileData'
import { FriendsMatch } from 'types/Matches'
import { NoNewMatchesOrMessages } from './NoNewMatchesOrMessages'
import { useMatchesStore } from 'zustand/friendsStore'

interface FriendsProps {
  onClick: (userProfileData: UserProfileData) => void
}

export function Friends({ onClick }: FriendsProps) {
  const { classes } = useStyles()
  const { matches: userFriends } = useMatchesStore()
  const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null)

  const handleClick = (friend: FriendsMatch) => {
    setSelectedFriendId(friend.id)
    onClick({
      id: friend.id,
      name: friend.name,
      age: friend.age.toString(),
      photos: [{ src: friend.photo }],
      city: '',
      distance: '',
      likedMe: false,
      reasons: [],
      preferences: {},
    })
  }

  if (userFriends?.length === 0) {
    return <NoNewMatchesOrMessages text="You don't have new matches." />
  }

  return (
    <Box className={classes.friendsBlock}>
      {userFriends?.map((element: FriendsMatch) => (
        <Box
          id={element.id}
          key={element.id}
          className={classnames([
            { [classes.friendsPhotoItem]: true },
            { [classes.fotoBorder]: element.id === selectedFriendId },
          ])}
          onClick={() => handleClick(element)}
        >
          <img src={element.photo} alt="photo" className={classes.smallPhoto} />
          <Typography className={classes.textOnPhoto}>
            {element.name}, {element.age}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

const useStyles = makeStyles()((theme) => ({
  friendsBlock: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
  },
  friendsPhotoItem: {
    justifySelf: 'center',
    display: 'grid',
    gridTemplateRows: 'auto 67px',
    border: '2px solid transparent',
    cursor: 'pointer',
    width: 'calc((100vw - 50px) / 2)',
    [theme.breakpoints.up('sm')]: {
      width: 'calc((100vw - 60px) / 3)',
    },
    [theme.breakpoints.up('md')]: {
      width: 190,
    },
  },
  smallPhoto: {
    width: '100%',
    objectFit: 'cover',
    gridRow: '1/3',
    gridColumn: '1/2',
    boxShadow: '0px 0px 7px 1px rgba(179, 179, 179, 0.14)',
  },
  textOnPhoto: {
    color: '#F46B5D',
    gridRow: '2/3',
    gridColumn: '1/2',
    fontSize: 15,
    fontWeight: 600,
    lineHeight: '40px',
    paddingTop: 27,
    paddingLeft: 5,
    background:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 49.79%)',
  },
  fotoBorder: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: theme.palette.primary.light,
    overflow: 'hidden',
  },
}))
