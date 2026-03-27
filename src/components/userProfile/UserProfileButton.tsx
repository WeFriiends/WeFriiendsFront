import { Box, Button } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { useStartChatWith } from 'hooks/useStartChatWith'

interface NewUser {
  skip: () => void
  beFriend: () => void
}

interface Friend {
  chatId: string
}

type UserProfileButtonProps = NewUser | Friend

export function UserProfileButton(props: UserProfileButtonProps) {
  const { classes } = useStyles()
  const startChatWith = useStartChatWith()
  return (
    <Box className={classes.buttonSection}>
      {'chatId' in props && (
        <Button
          className={classes.whiteButton}
          onClick={() => startChatWith(props.chatId)}
        >
          Start chat
        </Button>
      )}
      {'skip' in props && (
        <Button className={classes.whiteButton} onClick={props.skip}>
          Skip
        </Button>
      )}
      {'beFriend' in props && (
        <Button className={classes.orangeButton} onClick={props.beFriend}>
          Be friend
        </Button>
      )}
    </Box>
  )
}

const useStyles = makeStyles()((theme) => ({
  buttonSection: {
    display: 'flex',
    justifyContent: 'center',
    gap: 19,
    background: `linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, ${theme.customPalette.colorPeach} 100%)`,
    paddingTop: 20,
    paddingBottom: 30,
    marginBottom: 20,
  },
  whiteButton: {
    backgroundColor: theme.palette.common.white,
    border: `2px solid ${theme.palette.primary.light}`,
    color: theme.palette.primary.light,
    borderRadius: 10,
    fontSize: 18,
    fontWeight: 600,
    lineHeight: '20px',
    width: 140,
    height: 50,
    textTransform: 'none',
  },
  orangeButton: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    fontSize: 18,
    fontWeight: 700,
    lineHeight: '20px',
    borderRadius: 10,
    width: 140,
    height: 50,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}))
