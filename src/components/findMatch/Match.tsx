import { useId } from 'react'
import { Box, Avatar, Typography, Button } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import theme from '../../styles/createTheme'
import { CommonModal } from 'common/components/CommonModal'
import { useStartChatWith } from 'hooks/useStartChatWith'

interface MatchProps {
  matchedUser: {
    id: string
    avatar: string
  } | null
  currentUserAvatar?: string
  onClose: () => void
}

export function Match({
  onClose,
  matchedUser,
  currentUserAvatar = '/img/firstProfile/female.svg',
}: MatchProps) {
  const { classes } = useStyles()
  const titleId = useId()
  const descriptionId = useId()
  const startChatWith = useStartChatWith()

  function handleStartChat() {
    if (matchedUser) {
      startChatWith(matchedUser.id)
    }
  }

  return (
    <CommonModal
      isOpened={!!matchedUser}
      onClose={onClose}
      modalTitleID={titleId}
      modalDescriptionID={descriptionId}
      height={605}
      width={390}
    >
      <Box className={classes.matchContainer}>
        <Box className={classes.matchedAvatarsContainer}>
          <Avatar className={classes.matchedAvatar} src={currentUserAvatar} />
          <Avatar
            className={`${classes.matchedAvatar} ${classes.newMatchAvatar}`}
            src={matchedUser?.avatar ?? ''}
          />
        </Box>
        <Box className={classes.info}>
          <Typography
            id={titleId}
            variant="h2"
            component="h1"
            className={classes.title}
          >
            It’s a WeFriiends Moment!
          </Typography>
          <Typography
            id={descriptionId}
            variant="body1"
            className={classes.subTitle}
          >
            Ready for a Girl’s Talk?
          </Typography>
        </Box>
        <Box className={classes.buttonsContainer}>
          <Button
            className={`${classes.button} ${classes.laterButton}`}
            onClick={onClose}
            disableFocusRipple
            disableRipple
          >
            Later
          </Button>
          <Button
            className={`${classes.button} ${classes.chatButton}`}
            startIcon={<img alt="Chat" src="/img/icon-chat.svg" />}
            onClick={handleStartChat}
            disableFocusRipple
            disableRipple
          >
            Chat
          </Button>
        </Box>
      </Box>
    </CommonModal>
  )
}

const useStyles = makeStyles()({
  title: {
    textAlign: 'center',
  },
  subTitle: {
    color: theme.palette.common.black,
    textAlign: 'center',
  },
  matchContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 40,
    marginTop: 55,
  },
  newMatchAvatar: {
    marginLeft: -15,
  },
  matchedAvatarsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'end',
    justifyContent: 'space-around',
  },
  matchedAvatar: {
    width: 81,
    height: 81,
    border: '2px solid ' + theme.palette.common.white,
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 20,
  },
  buttonsContainer: {
    width: 263,
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    height: 50,
    width: 125,
    borderRadius: 10,
    fontSize: 14,
    textTransform: 'none',
  },
  laterButton: {
    color: theme.palette.primary.dark,
    fontWeight: 600,
    textDecoration: 'none',
    display: 'block',
    textAlign: 'center',
    border: '1px solid ' + theme.palette.primary.dark,
    boxShadow: '0 0 7px 1px rgba(179, 179, 179, 0.14)',
    '&:hover': {
      background: theme.palette.common.white,
    },
  },
  chatButton: {
    fontWeight: 700,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.light,
    textDecoration: 'none',
    display: 'flex',
    '&:hover': {
      background: theme.palette.primary.main,
    },
  },
})
