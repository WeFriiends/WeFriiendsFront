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

  const [dimensions, setDimensions] = useState<{
    width: number
    height: number
  } | null>(null)

  useEffect(() => {
    const img = new Image()
    img.src = url

    img.onload = () => {
      setDimensions({ width: img.width, height: img.height })
    }
  }, [url])

  const style = dimensions
    ? (() => {
        const widthScale = (window.innerWidth * 0.9) / dimensions.width
        const heightScale = (window.innerHeight * 0.9) / dimensions.height
        const scale = Math.min(widthScale, heightScale)
        return {
          backgroundImage: `url(${url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: dimensions.width * scale,
          height: dimensions.height * scale,
        }
      })()
    : undefined

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
