import { ReactNode } from 'react'
import NoticeNoUsers from 'components/noticeNoData/NoticeNoUsers'
import NoticeNoLikes from 'components/noticeNoData/NoticeNoLikes'

interface UserListConfig {
  title: string
  subTitle: string
  endpoint: string
  emptyContent: ReactNode
}

export const userListConfigs: Record<string, UserListConfig> = {
  nearMe: {
    title: 'Near by',
    subTitle: `These people near you – just like them and see if it's a match!`,
    endpoint: 'profile/nearest',
    emptyContent: <NoticeNoUsers />,
  },
  whoLikedMe: {
    title: 'Your likes list',
    subTitle: `These people have already liked you – just like them back and it's a match!`,
    endpoint: 'likes/on-me',
    emptyContent: <NoticeNoLikes />,
  },
}
