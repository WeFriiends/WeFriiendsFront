import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useProfileStore } from '../zustand/store'
import Loader from '../common/components/Loader'
import { handleLogout as logoutUtil } from '../utils/logoutUtils'

const UserAccount = () => {
  const { logout } = useAuth0()
  const {
    data: profile,
    loading,
    error,
    deleteProfile,
    updateProfile: updateProfileAction,
  } = useProfileStore()

  const deleteAccount = async () => {
    // deletes user only from MongoDB
    // todo: delete from auth0
    try {
      await deleteProfile()
      logoutUtil(logout)
    } catch (err) {
      console.error('Error deleting account:', err)
    }
  }

  const handleProfileUpdate = async () => {
    try {
      await updateProfileAction({
        location: {
          lat: 47.0265,
          lng: 28.8374,
          country: 'Moldova',
          city: 'Chișinău',
          street: 'Alexander Pushkin Street',
          houseNumber: '33',
        },
      })
    } catch (err) {
      console.error('Error updating profile:', err)
    }
  }

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h1>User Account</h1>
      <div>
        <h2>Name: {profile?.name}</h2>
        <h2>Date of Birth: {profile?.dateOfBirth}</h2>
        <h2>Gender: {profile?.gender}</h2>
        <h2>Country: {profile?.location?.country}</h2>
        <h2>City: {profile?.location?.city}</h2>
        <h2>Street: {profile?.location?.street}</h2>
        <h2>House number: {profile?.location?.houseNumber}</h2>
        <h2>
          Reasons:
          {profile?.reasons?.map((reason: string) => (
            <p key={reason}>{reason}</p>
          ))}
        </h2>
      </div>
      <button onClick={() => logoutUtil(logout)}>Log Out</button>
      <button onClick={handleProfileUpdate}>Update profile</button>
      <button onClick={deleteAccount}>Delete account</button>
    </div>
  )
}

export default UserAccount
