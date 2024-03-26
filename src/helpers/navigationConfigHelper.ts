import { CommonConfig, NavigationConfig } from '../common/types/navigationTypes'

export const generateNavigationConfig = (
  component: 'footer' | 'header'
): NavigationConfig[] => {
  const commonConfig = (
    isActive: boolean,
    imagePath: string,
    alt: string
  ): CommonConfig => ({
    isActive,
    imagePath,
    alt,
  })

  if (component === 'footer') {
    return [
      {
        value: 'nearme',
        iconProps: commonConfig(
          true,
          '/img/navigationIcons/near_me',
          'near_me'
        ),
        linkTo: 'near-me',
        size: { width: 18, height: 22 },
      },
      {
        value: 'wholikedyou',
        iconProps: commonConfig(
          true,
          '/img/navigationIcons/like_you',
          'who_liked_me'
        ),
        linkTo: 'who-liked-you',
        size: { width: 18, height: 24 },
      },
      {
        value: 'friends',
        iconProps: commonConfig(true, '/img/navigationIcons/ii', 'friends'),
        linkTo: 'messages-and-friends',
        size: { width: 15, height: 32 },
      },
      {
        value: 'chat',
        iconProps: commonConfig(true, '/img/navigationIcons/chat', 'chat'),
        linkTo: 'messages-and-friends',
        size: { width: 18, height: 18 },
      },
      {
        value: 'profile',
        iconProps: commonConfig(
          true,
          '/img/navigationIcons/profile',
          'profile'
        ),
        linkTo: 'messages-and-friends',
        size: { width: 24, height: 24 },
      },
    ]
  } else if (component === 'header') {
    return [
      {
        value: 'nearme',
        iconProps: commonConfig(
          true,
          '/img/navigationIcons/near_me',
          'near_me'
        ),
        linkTo: 'near-me',
        size: { width: 30, height: 35 },
      },
      {
        value: 'wholikedyou',
        iconProps: commonConfig(
          true,
          '/img/navigationIcons/like_you',
          'who_liked_me'
        ),
        linkTo: 'who-liked-you',
        size: { width: 28, height: 38 },
      },
      {
        value: 'friends',
        iconProps: commonConfig(true, '/img/navigationIcons/ii', 'friends'),
        linkTo: 'messages-and-friends',
        size: { width: 25, height: 50 },
      },
      {
        value: 'chat',
        iconProps: commonConfig(true, '/img/navigationIcons/chat', 'chat'),
        linkTo: 'messages-and-friends',
        size: { width: 30, height: 29 },
      },
    ]
  }

  return []
}
