import { NavigationConfig } from '../common/types/navigationTypes'
import IconChat from '../common/svg/IconChat'
import iconLightning from '../common/svg/IconLightning'
import iconII from '../common/svg/IconII'
import IconProfile from '../common/svg/IconProfile'
import IconNearMe from '../common/svg/IconNearMe'

export const generateNavigationConfig = (): NavigationConfig[] => {
  return [
    {
      value: 'nearme',
      Icon: IconNearMe,
      linkTo: '/near-me',
      size: { xs: { width: 20, height: 24 }, lg: { width: 31, height: 37 } },
    },
    {
      value: 'wholikedyou',
      Icon: iconLightning,
      linkTo: '/who-liked-you',
      size: { xs: { width: 20, height: 26 }, lg: { width: 27, height: 38 } },
    },
    {
      value: 'friends',
      Icon: iconII,
      // todo: remove temporary link to mock when work with real api data
      linkTo: '/swipes?fill',
      size: { xs: { width: 15, height: 32 }, lg: { width: 25, height: 50 } },
    },
    {
      value: 'chat',
      Icon: IconChat,
      // todo: remove temporary link to mock when work with real api data
      linkTo: '/messages?fill',
      size: { xs: { width: 25, height: 25 }, lg: { width: 30, height: 30 } },
    },
    {
      value: 'profile',
      Icon: IconProfile,
      linkTo: '/my-account',
      size: { xs: { width: 24, height: 26 }, lg: { width: 24, height: 26 } },
    },
  ]
}
