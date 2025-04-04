import React from 'react'
import Carousel from 'react-material-ui-carousel'
import UserPic from './UserPic'
import { UserPhoto } from 'types/UserProfileData'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import { Box } from '@mui/material'

interface PhotoCarouselProps {
  items: UserPhoto[]
  className?: string
}

const PhotoCarousel: React.FC<PhotoCarouselProps> = ({ items, className }) => {
  return (
    <Box className={className}>
      <Carousel
        autoPlay={false}
        navButtonsAlwaysVisible={true}
        IndicatorIcon={<img src="/img/indicator.svg" />}
        activeIndicatorIconButtonProps={{
          style: {
            backgroundColor: 'white',
            borderRadius: 0,
            height: '3px',
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
            marginTop: -535,
            zIndex: 200,
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
        sx={{ height: 535 }}
      >
        {items.map((item: UserPhoto, i: number) => (
          <UserPic key={i} src={item.src} />
        ))}
      </Carousel>
    </Box>
  )
}

export default PhotoCarousel
