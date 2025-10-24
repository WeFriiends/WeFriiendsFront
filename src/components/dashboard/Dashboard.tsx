import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const routes = [
    { path: '/', label: 'Register' },
    { path: '/callback', label: 'Auth Callback' },
    { path: '/user/fill-profile', label: 'Fill Profile' },
    { path: '/user/account', label: 'User Account' },
    { path: '/user/friends', label: 'Friends' },
    { path: '/user/messages', label: 'Messages' },
    { path: '/user/who-liked-you', label: 'Your Likes List' },
    { path: '/user/near-me', label: 'Near Me' },
    { path: '/user/my-account', label: 'My Account' },
    { path: '/user/new-match', label: 'New Match' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/report', label: 'Report Dialog Example' },
    { path: '/delete', label: 'Delete User Dialog Example' },
    { path: '/invite', label: 'Invitation' },
    { path: '/error-400', label: 'Error 400' },
    { path: '/error-500', label: 'Error 500' },
    { path: '*', label: 'Error Page (Catch-All)' },
  ]

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      <p>
        This page contains links to all the available routes in the application:
      </p>
      <ul>
        {routes.map((route) => (
          <li key={route.path}>
            <Link
              to={route.path}
              style={{ textDecoration: 'none', color: '#007bff' }}
            >
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Dashboard
