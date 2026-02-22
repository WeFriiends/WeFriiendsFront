import IconChat from '../common/svg/IconChat'
import iconLightning from '../common/svg/IconLightning'
import iconII from '../common/svg/IconII'
import IconProfile from '../common/svg/IconProfile'
import IconNearMe from '../common/svg/IconNearMe'

export const navMenu = [
  {
    to: '/near-me',
    icon: IconNearMe,
  },
  {
    to: '/who-liked-you',
    icon: iconLightning,
  },
  {
    to: '/swipes',
    icon: iconII,
  },
  {
    to: '/messages',
    icon: IconChat,
  },
  {
    to: '/my-account',
    icon: IconProfile,
  },
]
