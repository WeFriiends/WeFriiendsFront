import { Box, Button } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

const UserProfileButton = ({
  isFriend = false,
  skip,
}: {
  isFriend: boolean
  skip: () => void
}) => {
  const { classes } = useStyles()
  return isFriend ? (
    <Box className={classes.buttonSection}>
      <Button className={classes.whiteButton}> Start chat </Button>
    </Box>
  ) : (
    <Box className={classes.buttonSection}>
      <Button className={classes.whiteButton} onClick={skip}>
        Skip
      </Button>
      <Button className={classes.orangeButton}>Be friend</Button>
    </Box>
  )
}

export default UserProfileButton

const useStyles = makeStyles()({
  buttonSection: {
    display: 'flex',
    justifyContent: 'center',
    gap: 19,
    background:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FEDED2 100%)',
    paddingTop: 27,
    paddingBottom: 24,
  },
  whiteButton: {
    backgroundColor: '#FFFFFF',
    border: '2px solid #FB8F67',
    color: '#FB8F67',
    borderRadius: 10,
    fontSize: 22,
    fontWeight: 600,
    lineHeight: '20px',
    width: 141,
    height: 58,
    textTransform: 'none',
  },
  orangeButton: {
    backgroundColor: '#FB8F67',
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 700,
    lineHeight: '20px',
    borderRadius: 10,
    width: 141,
    height: 58,
    textTransform: 'none',
    '&: hover': {
      backgroundColor: '#FB8F67',
    },
  },
})
