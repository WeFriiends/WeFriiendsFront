import React, { useState, forwardRef, Ref, useImperativeHandle } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { CommonModal } from 'common/components/CommonModal'
import { makeStyles } from 'tss-react/mui'
import theme from '../styles/createTheme'
import { useNavigate } from 'react-router-dom'
import AgeRangeControl from '../components/myAccount/AgeRangeControl'
import RangeSliderDistance from '../components/myAccount/RangeSliderDistance'

interface NoMoreMatchesDialogProps {
  ref: Ref<{ handleOpenNoMoreMatchesDialog: () => void }>
  title: string
  description: string
}

const NoMoreMatchesDialog = forwardRef(
  (props: NoMoreMatchesDialogProps, ref) => {
    const { classes } = useStyles()
    const navigate = useNavigate()
    const [isModalVisible, setIsModalVisible] = useState(false)

    const handleChangeLocation = () => {
      navigate('/my-account')
    }

    const handleOpenNoMoreMatchesDialog = () => {
      setIsModalVisible(true)
    }

    const handleClose = () => {
      setIsModalVisible(false)
    }

    useImperativeHandle(ref, () => ({
      handleOpenNoMoreMatchesDialog,
    }))

    function handleDistanceChange() {
      // todo: updating the friendsDistanse
    }

    return (
      <CommonModal
        isOpened={isModalVisible}
        modalTitle={props.title}
        modalDescription={props.description}
        onClose={handleClose}
        height={605}
      >
        <Box className={classes.noMatchesContainer}>
          <Typography variant="h2" className={classes.title}>
            {props.title}
          </Typography>
          <Typography variant="body2" className={classes.description}>
            {props.description}
          </Typography>
          <Box className={classes.slidersWrapper}>
            <Box className={classes.slider}>
              <RangeSliderDistance value={20} onChange={handleDistanceChange}>
                <Typography
                  variant="h2"
                  className={`${classes.subtitle} ${classes.noBottomMargin}`}
                >
                  Distance
                </Typography>
              </RangeSliderDistance>
            </Box>
            <Box className={classes.slider}>
              <AgeRangeControl />
            </Box>
          </Box>
          <Box className={classes.btnContainer}>
            <Button
              onClick={handleClose}
              className={classes.okBtn}
              disableFocusRipple
              disableRipple
              disableElevation
            >
              OK
            </Button>
            <Button
              onClick={handleChangeLocation}
              className={`${classes.okBtn} ${classes.linkBtn}`}
              disableFocusRipple
              disableRipple
              disableElevation
            >
              change location
            </Button>
          </Box>
        </Box>
      </CommonModal>
    )
  }
)

export default NoMoreMatchesDialog

const useStyles = makeStyles()({
  noMatchesContainer: {
    display: 'grid',
  },
  title: {
    textAlign: 'center',
    paddingBottom: 30,
    fontSize: 20,
  },
  description: {
    textAlign: 'center',
    lineHeight: 1.2,
    padding: '0 40px',
  },
  btnContainer: {
    marginTop: 25,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  okBtn: {
    borderRadius: 10,
    textTransform: 'none',
    color: theme.palette.primary.light,
    border: '2px solid ' + theme.palette.primary.light,
    fontSize: 18,
    transition: 'color .3s, background-color .3s',
    fontWeight: 600,
    width: 260,
    height: 60,
    lineHeight: '56px',
    boxSizing: 'border-box',

    '&:active, &:hover': {
      fontWeight: 600,
      background: theme.palette.primary.light,
      color: theme.palette.common.white,
    },
  },
  linkBtn: {
    border: 0,
    marginTop: 10,
    '&:active, &:hover': {
      background: 'transparent',
      color: theme.palette.primary.light,
      textDecoration: 'underline',
    },
  },
  subtitle: {
    fontSize: 16,
    lineHeight: '22px',
    marginTop: 15,
    marginBottom: 20,
  },
  noBottomMargin: {
    marginBottom: 0,
  },
  slidersWrapper: {
    width: 305,
    margin: '5px auto 0',
  },
  slider: {
    marginBottom: 30,
  },
})
