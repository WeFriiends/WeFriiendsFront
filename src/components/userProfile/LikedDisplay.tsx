import { Typography, Box } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

type LikedDispayProps = {
  likedMe: boolean
}

const LikedDispay: React.FC<LikedDispayProps> = ({ likedMe }) => {
  const { classes } = useStyles()
  return (
    <>
      {likedMe && (
        <Box className={classes.likesYou}>
          <img src="/img/likes_me.svg" alt="likes me" />
          <Typography>Likes you</Typography>
        </Box>
      )}
    </>
  )
}

export default LikedDispay

const useStyles = makeStyles()({
  likesYou: {
    display: 'flex',
    borderRadius: 4,
    background: 'rgba(255, 241, 236, 0.80)',
    width: 111,
    height: 37,
    alignItems: 'center',
    gap: 4,
    padding: '3px 5px',
  },
})
