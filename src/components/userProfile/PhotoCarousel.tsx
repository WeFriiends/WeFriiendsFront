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

export const PhotoCarousel: React.FC<PhotoCarouselProps> = ({
  items,
  className,
}) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')

  const defaultPhoto = '/img/placeholders/girl-big.svg'

  const handleImageClick = (src: string) => {
    setSelectedImage(src)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const hasMultiplePhotos = items?.length > 1

  return (
    <>
      <Box className={className}>
        <Carousel
          autoPlay={false}
          // display arrows if 2+ pics
          navButtonsAlwaysVisible={hasMultiplePhotos}
          navButtonsProps={{
            style: hasMultiplePhotos
              ? {
                  padding: '12px',
                  color: '#444444',
                  background: 'white',
                  opacity: '0.5',
                }
              : {
                  display: 'none',
                },
          }}
          NextIcon={<ArrowForwardIos style={{ fontSize: 23 }} />}
          PrevIcon={<ArrowBackIosNew style={{ fontSize: 23 }} />}
          // display carousel indicators if 2+ pics
          IndicatorIcon={
            hasMultiplePhotos ? (
              <div
                style={{
                  width: 85,
                  height: 3,
                  backgroundColor: 'rgba(255,255,255,0.5)',
                }}
              />
            ) : undefined
          }
          activeIndicatorIconButtonProps={{
            style: hasMultiplePhotos
              ? {
                  backgroundColor: 'white',
                  borderRadius: 0,
                }
              : {
                  display: 'none',
                },
          }}
          indicatorIconButtonProps={{
            style: hasMultiplePhotos
              ? {
                  marginRight: '3px',
                }
              : {
                  display: 'none',
                },
          }}
          indicatorContainerProps={{
            style: hasMultiplePhotos
              ? {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  zIndex: 200,
                  display: 'flex',
                  justifyContent: 'center',
                }
              : {
                  display: 'none',
                },
          }}
          sx={{
            height: { xs: 420, sm: 535 },
          }}
        >
          {items?.length > 0 ? (
            items.map((item: UserPhoto, i: number) => (
              <div
                key={i}
                onClick={() => handleImageClick(item.src)}
                style={{ cursor: 'pointer' }}
              >
                <UserPic src={item.src} />
              </div>
            ))
          ) : (
            <div style={{ cursor: 'default' }}>
              <UserPic src={defaultPhoto} />
            </div>
          )}
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
