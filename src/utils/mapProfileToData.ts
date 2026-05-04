import { UserProfileDataShort, UserProfileData } from 'types/UserProfileData'
import { UserProfile } from 'zustand/userProfileStore'

export const mapProfileToData = (
  profile: UserProfile | null,
  fallback: UserProfileDataShort | null
): UserProfileData => {
  const defaultPhoto = '/img/placeholders/girl-big.svg'

  return {
    id: profile?._id || fallback?.id || '',
    name: profile?.name || fallback?.name || '',
    age: profile?.age?.toString() || fallback?.age?.toString() || '',
    photos: profile?.photos || [{ src: defaultPhoto }],
    city: profile?.city || '',
    distance: profile?.distance?.toString() || '',
    likedMe: profile?.likedMe || false,
    reasons: profile?.reasons || [],
    preferences: profile?.preferences || {},
  }
}
