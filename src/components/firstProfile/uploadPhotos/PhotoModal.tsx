import React, { useEffect, useState } from 'react'
import { Box, Modal } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

type PhotoModalProps = {
  isOpened: boolean
  setIsPhotoModalOpened: (isOpened: boolean) => void
  url: string
}

export const PhotoModal = ({
  isOpened,
  url,
  setIsPhotoModalOpened,
}: PhotoModalProps) => {
  const { classes } = useStyles()

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const img = new Image()
    img.src = url

    img.onload = () => {
      setDimensions({ width: img.width, height: img.height })
    }
  }, [url])

  const { width: imgWidth, height: imgHeight } = dimensions
  let displayedWidth: number = imgWidth
  let displayedHeight: number = imgHeight

  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  const widthScale = (windowWidth * 0.9) / imgWidth
  const heightScale = (windowHeight * 0.9) / imgHeight

  const scale = Math.min(widthScale, heightScale)

  displayedWidth = imgWidth * scale
  displayedHeight = imgHeight * scale

  const style = {
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: displayedWidth,
    height: displayedHeight,
  }

  return (
    <Modal className={classes.modal} open={isOpened}>
      <Box style={style} className={classes.box}>
        <img
          src={'/img/x-square-white.svg'}
          alt="close photo"
          className={classes.closeIcon}
          onClick={() => setIsPhotoModalOpened(false)}
        />
      </Box>
    </Modal>
  )
}

const useStyles = makeStyles()(() => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& :focus': {
      outline: 'none',
    },
  },
  box: {
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    top: '-21px',
    right: '-21px',
    '&:hover': {
      cursor: 'pointer',
    },
    '@media (max-width: 480px)': {
      top: '10px',
      right: '10px',
      width: '28px',
      height: '28px',
    },
  },
}))
