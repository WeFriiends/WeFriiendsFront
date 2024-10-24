import { useRef } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  List,
  ListItem,
} from '@mui/material'
import theme from '../../styles/createTheme'
import { makeStyles } from 'tss-react/mui'
import PhotoCarousel from './PhotoCarousel'
import { UserProfileData } from '../../types/UserProfileData'
import LikeDispay from './LikedDisplay'
import ReportDialog from 'components/report/ReportDialog'

interface UserProfileProps {
  user: UserProfileData
}
const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const { classes } = useStyles()
  const accountId = '1'
  const reportDialogRef = useRef<{ handleOpenReportDialog: () => void }>(null)

  const handleOpenReportDialog = () => {
    reportDialogRef.current?.handleOpenReportDialog()
  }

  const printInterest = (interest: string | string[]) => {
    if (typeof interest === 'string') {
      return <Typography className={classes.text}>{interest}</Typography>
    } else {
      return (
        <List className={classes.interestsList}>
          {interest.map((value) => (
            <ListItem key={value} className={classes.interest}>
              {value}
            </ListItem>
          ))}
        </List>
      )
    }
  }

  return (
    <>
      <Box className={classes.mainGrid}>
        <Box className={classes.iconsAbove}>
          <LikeDispay accountId={accountId} likedUsersArray={user.likedUsers} />
          {/* <img src="/img/verified.svg"></img> */}
          {/* We don't use it in MVP1 */}
        </Box>

        <div className={classes.carousel}>
          <PhotoCarousel items={user.photo} />
        </div>

        <Accordion className={classes.accordion}>
          <AccordionSummary expandIcon={<img src="/img/arrow-down.svg" />}>
            <Box>
              <Box sx={{ display: 'flex' }}>
                <Typography className={classes.name}>
                  {user.name}, {user.age}
                </Typography>
                {/* <CircleRoundedIcon
                  className={classes.roundIcon}
                ></CircleRoundedIcon> */}
                {/* We don't use it in MVP1 */}
              </Box>
              <Box className={classes.distanceWithIcon}>
                <img src="/img/near_me.svg" height={20} width={20} />
                <Typography className={classes.distance}>
                  from {user.city}, 10 km from you
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails
            sx={{ overflow: 'auto', maxHeight: 'calc(49vh - 340px)' }}
          >
            <List className={classes.reasons}>
              {user.reasons.map((reason) => (
                <ListItem key={reason} className={classes.reason}>
                  {reason}
                </ListItem>
              ))}
            </List>
            <List>
              {user.lifeStyle &&
                Object.entries(user.lifeStyle).map(([interest, value]) => (
                  <ListItem key={interest} className={classes.titleAndText}>
                    <Typography variant="h3" className={classes.title}>
                      {interest.charAt(0).toUpperCase() + interest.slice(1)}
                    </Typography>
                    {printInterest(value)}
                  </ListItem>
                ))}
            </List>
            <Box className={classes.reportBlock}>
              <Typography
                className={classes.sendReport}
                onClick={handleOpenReportDialog}
              >
                Report a user
              </Typography>
              <ReportDialog ref={reportDialogRef} />
              <Typography className={classes.textReport}>
                Don’t worry, {user.name} won’t know about it
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  )
}
export default UserProfile

const useStyles = makeStyles()(() => {
  return {
    mainGrid: {
      display: ' grid',
    },
    iconsAbove: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      zIndex: 100,
      padding: '26px 11px 0',
      gridRow: '1/1',
      gridColumn: '1/2',
    },

    carousel: {
      gridRow: '1/9',
      gridColumn: '1/2',
    },

    name: {
      color: '#F46B5D',
      fontSize: 44,
      fontWeight: 600,
      lineHeight: '40px',
    },
    roundIcon: {
      fill: '#77BD65',
      width: 15,
      height: 15,
      marginLeft: 5,
    },
    distanceWithIcon: {
      display: 'flex',
      alignItems: 'flex-end',
      padding: '16px 0 6px',
    },
    distance: {
      fontSize: 18,
      fontWeight: 500,
      lineHeight: '20px',
      paddingLeft: 4,
    },
    title: {
      color: '#F1562A',
      fontSize: 16,
      fontWeight: 500,
      lineHeight: '20px',
      paddingBottom: 15,
      paddingTop: 35,
    },
    text: {
      fontSize: 14,
      lineHeight: '22px',
      background: '#FEDED2',
      borderRadius: 20,
      padding: '7px 15px',
    },
    accordion: {
      zIndex: 100,
      paddingTop: 100,
      marginTop: -206,
      background:
        'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 49.79%)',
      '&::before': {
        height: 0,
      },
      '&.Mui-expanded': {
        marginTop: -206,
      },
    },
    reasons: {
      display: 'grid',
      gridTemplateColumns: '180px 180px ',
      gap: 15,

      '&MuiList-root': {
        paddingBottom: 0,
      },
    },
    reason: {
      backgroundColor: 'rgba(254, 222, 210, 1)',
      borderRadius: 10,

      '&.MuiListItem-root': {
        padding: '10px 20px',
        fontSize: 14,
        lineHeight: '16.8px',
      },
    },
    titleAndText: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: 0,
    },
    interestsList: {
      display: 'flex',
      padding: 0,
    },
    interest: {
      fontSize: 14,
      lineHeight: '22px',
      background: '#FEDED2',
      borderRadius: 20,
      padding: '7px 15px',
      marginRight: 10,
    },
    reportBlock: {
      borderTop: '2px solid #E0E0E0',
      marginTop: 90,
      paddingTop: 20,
      paddingBottom: 35,
      textAlign: 'center',
    },
    sendReport: {
      fontWeight: 500,
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
    textReport: {
      fontSize: 14,
      paddingTop: 10,
    },
  }
})
