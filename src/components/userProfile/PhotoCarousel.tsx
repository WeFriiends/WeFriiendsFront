import React, { useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import UserPic from './UserPic'
import { UserPhoto } from 'types/UserProfileData'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import { Box } from '@mui/material'
import { PhotoModal } from 'components/firstProfile/uploadPhotos/PhotoModal'

interface PhotoCarouselProps {
  items: UserPhoto[]
  className?: string
}

const PhotoCarousel: React.FC<PhotoCarouselProps> = ({ items, className }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')

  const handleImageClick = (src: string) => {
    setSelectedImage(src)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  return (
    <>
      <Box className={className}>
        <Carousel
          autoPlay={false}
          navButtonsAlwaysVisible={true}
          IndicatorIcon={
            <div
              style={{
                width: 85,
                height: 3,
                backgroundColor: 'rgba(255,255,255,0.5)',
              }}
            />
          }
          activeIndicatorIconButtonProps={{
            style: {
              backgroundColor: 'white',
              borderRadius: 0,
            },
          }}
          indicatorIconButtonProps={{
            style: {
              marginRight: '3px',
            },
          }}
          indicatorContainerProps={{
            style: {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 200,
              display: 'flex',
              justifyContent: 'center',
            },
          }}
          navButtonsProps={{
            style: {
              padding: '12px',
              color: '#444444',
              background: 'white',
              opacity: '0.5',
            },
          }}
          NextIcon={<ArrowForwardIos style={{ fontSize: 23 }} />}
          PrevIcon={<ArrowBackIosNew style={{ fontSize: 23 }} />}
          sx={{
            height: { xs: 420, sm: 535 },
          }}
        >
          {items.map((item: UserPhoto, i: number) => (
            <div
              key={i}
              onClick={() => handleImageClick(item.src)}
              style={{ cursor: 'pointer' }}
            >
              <UserPic src={item.src} />
            </div>
          ))}
        </Carousel>
      </Box>

      <PhotoModal
        isOpened={modalOpen}
        url={selectedImage}
        setIsPhotoModalOpened={handleCloseModal}
      />
    </>
  )
}

export default PhotoCarousel
