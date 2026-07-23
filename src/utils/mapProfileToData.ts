import { UserProfileDataShort, UserProfileData } from 'types/UserProfileData'
import { UserProfile } from 'zustand/userProfileStore'
import { DEFAULT_PROFILE_PHOTO } from 'data/constants'

export const mapProfileToData = (
  profile: UserProfile | null,
  fallback: UserProfileDataShort | null
): UserProfileData => {
  const defaultPhoto = DEFAULT_PROFILE_PHOTO

  return {
    id: profile?._id || fallback?.id || '',
    name: profile?.name || fallback?.name || '',
    age: profile?.age?.toString() || fallback?.age?.toString() || '',
    photos: profile?.photos || fallback?.photos || [defaultPhoto],
    city: profile?.city || '',
    distance: profile?.distance?.toString() || '',
    likedMe: profile?.likedMe || false,
    reasons: profile?.reasons || [],
    preferences: profile?.preferences || {},
  }
}
