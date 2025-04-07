import React, { useState, useMemo } from 'react'
//import FirestoreChat from './firestoreChat/FirestoreChat'
import FirestoreChatStyled from './firestoreChat/FirestoreChatStyled'
import { Box, Button } from '@mui/material'

const FirestoreChatExamplePage = () => {
  const [selectedRoomId, setSelectedRoomId] = useState('room2')
  const [currentUserName1, setCurrentUserName1] = useState('Olga')
  const [currentUserName2, setCurrentUserName2] = useState('Marina')

  const memoizedRoomId = useMemo(() => selectedRoomId, [selectedRoomId])
  const memoizedUserName1 = useMemo(() => currentUserName1, [currentUserName1])
  const memoizedUserName2 = useMemo(() => currentUserName2, [currentUserName2])
  return (
    <>
      {/* <Box
        sx={{
          margin: 5,
          display: 'grid',
          gridTemplateColumns: '575px 575px',
          gap: 50,
        }}
      >
        <FirestoreChat userName="Marina" roomId="room1" />
        <FirestoreChat userName="Svitlana" roomId="room1" /> 
      </Box> */}
      <hr />
      <Box sx={{ m: 2 }}>
        <div>
          Room: <strong>{selectedRoomId}</strong>
        </div>
        <div>
          User 1: <strong>{currentUserName1}</strong>
        </div>
        <div>
          User 2: <strong>{currentUserName2}</strong>
        </div>
        <Button onClick={() => setSelectedRoomId('room1')}>Room 1</Button>
        <Button onClick={() => setSelectedRoomId('room2')}>Room 2</Button>
        <Button onClick={() => setCurrentUserName1('Olga')}>
          User 1: Olga
        </Button>
        <Button onClick={() => setCurrentUserName1('Svitlana')}>
          User 1: Svitlana
        </Button>
        <Button onClick={() => setCurrentUserName2('Marina')}>
          User 2: Marina
        </Button>
        <Button onClick={() => setCurrentUserName2('Alex')}>
          User 2: Alex
        </Button>
      </Box>

      <hr />

      <Box
        sx={{
          m: 5,
          display: 'grid',
          gridTemplateColumns: '575px 575px',
          gap: 50,
        }}
      >
        <FirestoreChatStyled
          userName={memoizedUserName1}
          roomId={memoizedRoomId}
        />
        <FirestoreChatStyled
          userName={memoizedUserName2}
          roomId={memoizedRoomId}
        />
      </Box>
    </>
  )
}

export default FirestoreChatExamplePage
