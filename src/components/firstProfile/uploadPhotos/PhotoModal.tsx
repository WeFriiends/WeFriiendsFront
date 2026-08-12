import { Box, Modal } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import Carousel from 'react-material-ui-carousel'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import { ProfilePhoto } from 'types/UserProfileData'

type PhotoModalProps = {
  isOpened: boolean
  setIsPhotoModalOpened: (isOpened: boolean) => void
  items: ProfilePhoto[]
  imageIndex: number
}

export const PhotoModal = ({
  isOpened,
  items,
  imageIndex,
  setIsPhotoModalOpened,
}: PhotoModalProps) => {
  const { classes } = useStyles()

  return (
    <Modal className={classes.modal} open={isOpened}>
      <Box className={classes.box}>
        <img
          src={'/img/x-square-white.svg'}
          alt="close photo"
          className={classes.closeIcon}
          onClick={() => setIsPhotoModalOpened(false)}
        />
        <Carousel
          index={imageIndex}
          autoPlay={false}
          navButtonsAlwaysVisible={items?.length > 1}
          NavButton={items?.length > 1 ? undefined : () => null}
          NextIcon={<ArrowForwardIos style={{ fontSize: 23 }} />}
          PrevIcon={<ArrowBackIosNew style={{ fontSize: 23 }} />}
          IndicatorIcon={null}
          sx={{
            height: '80vh',
            width: {
              xs: '90vw',
              sm: '80vw',
              md: '60vw',
              lg: '50vw',
              xl: '40vw',
            },
          }}
        >
          {items?.map((item) => (
            <Box
              key={item}
              sx={{
                width: '100%',
                height: '80vh',
              }}
            >
              <img src={item} alt="card" className={classes.img} key={item} />
            </Box>
          ))}
        </Carousel>
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  closeIcon: {
    position: 'absolute',
    top: '-21px',
    right: '-21px',
    zIndex: 10,
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
