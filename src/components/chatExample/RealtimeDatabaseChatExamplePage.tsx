import { Box } from '@mui/material'
import RealtimeDatabaseChat from './realtimeDatabaseChat/RealtimeDatabaseChat'
import React from 'react'
import RealtimeDatabaseChatComponentStyled from './realtimeDatabaseChat/RealtimeDatabaseChatStyled'

const RealtimeDatabaseChatExamplePage = () => {
  return (
    <>
      <Box
        sx={{
          m: 5,
          display: 'grid',
          gridTemplateColumns: '575px 575px',
          gap: 50,
        }}
      >
        <RealtimeDatabaseChatComponentStyled
          roomId="room2"
          userName="Olga Zavizionnaya"
        />
        <RealtimeDatabaseChatComponentStyled
          roomId="room2"
          userName="Svitlana Golubieva"
        />
      </Box>

      <hr />
      <RealtimeDatabaseChat roomId="room1" userName="Natalia Doudkina" />
      <RealtimeDatabaseChat roomId="room1" userName="Kateryna Shvets" />
    </>
  )
}

export default RealtimeDatabaseChatExamplePage
