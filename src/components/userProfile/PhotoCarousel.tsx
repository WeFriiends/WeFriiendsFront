import React from 'react'
import Carousel from 'react-material-ui-carousel'
import UserPic from './UserPic'
import { UserPhoto } from 'types/UserProfileData'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'

interface PhotoCarouselProps {
  items: UserPhoto[]
}

const PhotoCarousel: React.FC<PhotoCarouselProps> = ({ items }) => {
  return (
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
          marginTop: '-537px',
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
    >
      {items.map((item: UserPhoto, i: number) => (
        <UserPic key={i} src={item.src} />
      ))}
    </Carousel>
  )
}

export default PhotoCarousel
