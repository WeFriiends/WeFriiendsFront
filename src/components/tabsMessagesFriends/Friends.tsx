import React from 'react'
import { Box, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { emptyProfile, UserProfileData } from '../../types/UserProfileData'
import { FriendsMatch } from 'types/Matches'
import NoNewMatches from './NoNewMatchesOrMessages'
import { useMatches } from 'hooks/useMatches'
import theme from 'styles/createTheme'
import classnames from 'classnames'

interface FriendsProps {
  onClick: (userProfileData: UserProfileData) => void
}

const Friends: React.FC<FriendsProps> = ({ onClick }) => {
  const { classes } = useStyles()
  const { data: userFriends } = useMatches()
  /* const [friendsData, setFriendsData] = useState<UserProfileData>(emptyProfile)

  const handleClick = (user: UserProfileData) => {
    const friendsData = user
    setFriendsData(friendsData)
    onClick(friendsData)
  }
*/
  // handleClick and useState temporarily commented out - until the API for Profile by id becomes available

  if (userFriends?.length === 0) {
    return <NoNewMatches text="You don’t have new matches." />
  }

  return (
    <Box className={classes.friendsBlock}>
      {userFriends?.map((element: FriendsMatch) => (
        <Box
          id={element.id}
          key={element.id}
          className={classnames([
            { [classes.friendsPhotos]: true },
            // { [classes.fotoBorder]: element.id === friendsData._id }, - temporarily commented out - until the API for Profile by id becomes available
          ])}
          // onClick={() => handleClick(element)} - temporarily commented out - until the API for Profile by id becomes available
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
export default Friends

const useStyles = makeStyles()({
  friendsBlock: {
    display: 'grid',
    gridTemplateColumns: '153px 153px',
    gridAutoRows: 184,
    gridGap: 25,
    maxHeight: '71vh',
    overflow: 'auto',
    paddingLeft: 2,
  },
  friendsPhotos: {
    justifySelf: 'center',
    display: 'grid',
    gridTemplateRows: '1fr 67px',
  },
  smallPhoto: {
    width: 153,
    height: 184,
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
})
