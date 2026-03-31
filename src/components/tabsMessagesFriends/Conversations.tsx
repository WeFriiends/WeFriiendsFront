// import { useConversationsStore } from 'zustand/conversationsStore'
import { Conversation } from 'types/Conversation'
import { ConversationItem } from './ConversationItem'
// import { NoNewMatchesOrMessages } from './NoNewMatchesOrMessages'
// import { useConversationsWithUserData } from 'pages/MessagesPage'
// import { useEffect, useState } from 'react'
// import { UserProfileData } from 'types/UserProfileData'
// import { getUserById } from 'actions/userServices'

export function Conversations({ data }: { data: Conversation[] }) {
  // const { conversations, loading, error } = useConversationsStore()
  // const users = useGetAllUsers(conversations.map((c) => c.id))
  // const conversations = useConversationsWithUserData() ?? []

  // if (loading) {
  //   return <div>Loading conversations...</div>
  // }

  // if (error) {
  //   return <div>Error loading conversations: {error.message}</div>
  // }

  // if (conversations.length === 0) {
  //   return (
  //     <NoNewMatchesOrMessages text="You don't have any conversations. You need to find friends first!" />
  //   )
  // }

  return data.map((conversation) => (
    <ConversationItem key={conversation.id} data={conversation} />
  ))
}
