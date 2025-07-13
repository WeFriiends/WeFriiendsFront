import React from 'react'
import { Box, Button, Typography } from '@mui/material'

const Dashboard = () => {
  const routes = {
    notAuthed: [{ path: '/', label: 'Register/Login page' }],
    authed: [
      { path: '/callback', label: 'Auth Callback' },
      { path: '/my-account', label: 'My Account' },
      { path: '/friends', label: 'Friends' },
      { path: '/friends?fill', label: 'Friends with mock data' },
      { path: '/fill-profile', label: 'Fill Profile' },
      { path: '/messages', label: 'Messages' },
      { path: '/messages?fill', label: 'Messages with mock data' },
      { path: '/who-liked-you', label: 'Your Likes List' },
      { path: '/near-me', label: 'Near Me' },
      { path: '/email-confirmed', label: 'email-confirmed' },
      { path: '/account-created', label: 'account-created' },
      { path: '/email-already-confirmed', label: 'email-already-confirmed' },
    ],
    temporaryExamples: [
      {
        path: '/security-dialog',
        label: 'Security Dialog Example (Delete, Block, Materials)',
      },
      { path: '/report', label: 'Report Dialog Example (Report or Block)' },
      { path: '/delete', label: 'Delete User Dialog Example' },
      { path: '/invite', label: 'Invitation' },
      { path: '/error-400', label: 'Error 400' },
      { path: '/error-500', label: 'Error 500' },
      { path: '*', label: 'Error Page (Catch-All)' },
      { path: '/no-friends-in-your-area', label: 'Error Mens Search' },
      { path: '/notice-no-likes', label: 'Notice No Likes' },
      { path: '/notice-no-users', label: 'Notice No Users' },
      { path: '/new-match', label: 'New Match' },
      {
        path: '/realtime-database-chat',
        label: 'Firebase/Realtime database chat example',
      },
      { path: '/firestore-chat', label: 'Firebase/Firestore chat example' },
    ],
    temporary: [
      {
        path: '/account',
        label: 'User Account (works only after login and first profile)',
      },
      { path: '/logout', label: 'logout' },
      { path: '/dashboard', label: 'Dashboard' },
    ],
  }

  const renderRoutes = (
    title: string,
    routes: { path: string; label: string }[]
  ) => (
    <div>
      <Typography variant="h2" sx={{ marginTop: 2, marginBottom: 2 }}>
        {title}
      </Typography>
      {routes.map((route) => (
        <Box key={route.path} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ marginRight: 2 }}>
            {route.path}
          </Typography>
          <Button
            variant="text"
            href={route.path}
            sx={{ textDecoration: 'none', color: '#007bff', p: 0 }}
          >
            {route.label}
          </Button>
        </Box>
      ))}
    </div>
  )

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h1">Dashboard</Typography>
      {renderRoutes('Routes for authenticated users', routes.authed)}
      {renderRoutes('Routes for not authenticated users', routes.notAuthed)}
      {renderRoutes(
        'Examples, additional components, routes for demonstration',
        routes.temporaryExamples
      )}
      {renderRoutes('Technical/temporary routes', routes.temporary)}
    </Box>
  )
}

export default Dashboard
