import React, { useState, forwardRef, Ref, useImperativeHandle } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { CommonModal } from 'common/components/CommonModal'
import { makeStyles } from 'tss-react/mui'
import theme from '../styles/createTheme'
import AgeRangeControl from '../components/myAccount/AgeRangeControl'
import DistanceControl from '../components/myAccount/DistanceControl'

interface NoMoreMatchesDialogProps {
  ref: Ref<{ handleOpenNoMoreMatchesDialog: () => void }>
  title: string
  description?: string
}

const NoMoreMatchesDialog = forwardRef(
  (props: NoMoreMatchesDialogProps, ref) => {
    const { classes } = useStyles()
    const [isModalVisible, setIsModalVisible] = useState(false)

    const handleOpenNoMoreMatchesDialog = () => {
      setIsModalVisible(true)
    }

    const handleClose = () => {
      setIsModalVisible(false)
    }

    useImperativeHandle(ref, () => ({
      handleOpenNoMoreMatchesDialog,
    }))

    return (
      <CommonModal
        isOpened={isModalVisible}
        modalTitle={props.title}
        modalDescription={props.description || ''}
        onClose={handleClose}
        height={605}
      >
        <Box>
          <Typography variant="h2" className={classes.title}>
            {props.title}
          </Typography>
          <Typography variant="body2" className={classes.description}>
            {props.description}
          </Typography>
          <Box className={classes.slidersWrapper}>
            <Box className={classes.slider}>
              <DistanceControl shortLabel />
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
              onClick={handleClose}
              className={`${classes.okBtn} ${classes.linkBtn}`}
              disableFocusRipple
              disableRipple
              disableElevation
            >
              cancel
            </Button>
          </Box>
        </Box>
      </CommonModal>
    )
  }
)

export default NoMoreMatchesDialog

const useStyles = makeStyles()({
  title: {
    textAlign: 'center',
    paddingBottom: 30,
    fontSize: 20,
  },
  description: {
    textAlign: 'center',
    lineHeight: 1.2,
    maxWidth: 250,
    margin: '0 auto',
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
    maxWidth: '100%',
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
    maxWidth: 305,
    margin: '5px auto 55px',
  },
  slider: {
    marginBottom: 35,
  },
})
