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
  // const accountId = '1'
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
          <LikeDispay likedMe={user.likedMe} />
          {/* <img src="/img/verified.svg"></img> */}
          {/* We don't use it in MVP1 */}
        </Box>

        <div className={classes.carousel}>
          <PhotoCarousel items={user.photos} />
          <Box className={classes.gradientOverlay} />
        </div>

        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<img src="/img/arrow-down.svg" />}
            sx={{
              '& .MuiAccordionSummary-content.Mui-expanded': {
                margin: '12px 0',
              },
            }}
          >
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
                  from {user.city}, {user.distance} km from you
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {/* <List className={classes.reasons}>
              {user.reasons.map((reason) => (
                <ListItem key={reason} className={classes.reason}>
                  {reason}
                </ListItem>
              ))}
            </List> */}
            {user.preferences && user.preferences.aboutMe && (
              <Box>
                <Typography variant="h3" className={classes.title}>
                  About me
                </Typography>
                <Typography className={classes.textAbout}>
                  {user.preferences.aboutMe}
                </Typography>
              </Box>
            )}
            <List>
              {user.preferences &&
                user.preferences.questionary &&
                Object.entries(user.preferences.questionary).map(
                  ([interest, value]) => {
                    if (Array.isArray(value) && value.length === 0) {
                      return null
                    }
                    return (
                      <ListItem key={interest} className={classes.titleAndText}>
                        <Typography variant="h3" className={classes.title}>
                          {interest.charAt(0).toUpperCase() + interest.slice(1)}
                        </Typography>
                        {printInterest(value)}
                      </ListItem>
                    )
                  }
                )}
            </List>
            {user.preferences &&
              Array.isArray(user.preferences.interests) &&
              user.preferences.interests.length !== 0 && (
                <Box>
                  <Typography variant="h3" className={classes.title}>
                    Interests
                  </Typography>
                  <List className={classes.tagsList}>
                    {user.preferences.interests.map((interest) => (
                      <ListItem key={interest} className={classes.tag}>
                        {interest}
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            <Box className={classes.reportBlock}>
              <Typography
                className={classes.sendReport}
                onClick={handleOpenReportDialog}
              >
                Block a user
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
      position: 'relative',
      boxShadow: '0px 0px 7px 1px #B3B3B324',
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
      position: 'relative',
      gridRow: '1/9',
      gridColumn: '1/2',
    },

    name: {
      color: '#F46B5D',
      fontSize: 40,
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
      lineHeight: '20px',
      paddingLeft: 4,
    },
    title: {
      color: '#F1562A',
      fontSize: 16,
      fontWeight: 500,
      lineHeight: '20px',
      paddingBottom: 10,
      paddingTop: 35,
    },
    text: {
      fontSize: 14,
      lineHeight: '22px',
      background: '#FEDED2',
      borderRadius: 20,
      padding: '7px 15px',
    },
    gradientOverlay: {
      position: 'absolute',
      bottom: 106,
      left: 0,
      width: '100%',
      height: '79px',
      background:
        'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 100%)',
      zIndex: 5,
      pointerEvents: 'none',
    },
    accordion: {
      boxShadow: 'none',
      position: 'relative',
      zIndex: 10,
      marginTop: -106,
      '&::before': {
        display: 'none',
      },
      '&.Mui-expanded': {
        margin: 0,
        marginTop: -106,
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
      lineHeight: '20px',
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
    textReport: {
      fontSize: 14,
      paddingTop: 10,
      lineHeight: '20px',
    },
    textAbout: {
      fontSize: 14,
      color: ' #000000',
    },
    tagsList: {
      display: 'flex',
      columnGap: 15,
      rowGap: 10,
      flexWrap: 'wrap',
      paddingTop: 0,
    },
    tag: {
      backgroundColor: ' #EEEEEE',
      padding: 8,
      borderRadius: 8,
      width: 'auto',
      fontSize: 12,
      lineHeight: '20px',
    },
  }
})
