import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware'
import {
    createProfile as apiCreateProfile,
    getProfile,
    checkProfile,
    updateProfile,
    deleteProfile,
} from './api'
import {UserPicsType, Location, UserPreferences} from '../types/FirstProfile'
import {clearLocalStorage} from 'utils/localStorage'
import {usePotentialFriendsStore} from './friendsStore'
import axios from 'axios'

interface AuthState {
    token: string | null
    setToken: (token: string | null) => void
}

interface Profile {
    name: string
    dateOfBirth: string
    location: Location
    photos: (string | { url: string })[]
    gender: string
    reasons: string[]
    friendsAgeMin?: number
    friendsAgeMax?: number
    friendsDistance?: number
    userPreferences?: UserPreferences
}

interface PhotoFields {
    tempPhotos: UserPicsType[]
    cloudUrls: string[]
    setTempPhotos: (photos: UserPicsType[]) => void
    clearTempPhotos: () => void
    addTempPhoto: (photo: UserPicsType) => void
    removeTempPhoto: (id: string) => void
}

type ProfileStore = ProfileState & ProfileActions & PhotoFields

interface ErrorResponse {
    message: string
    status?: number
    details?: any
}

interface ProfileState {
    loading: boolean
    success: boolean
    error: boolean
    data: Profile | null
    hasProfile: boolean | null
    errorData: ErrorResponse | null
}

interface ProfileActions {
    createProfile: (
        profileData: Omit<Profile, 'photos'>,
        token: string | null
    ) => Promise<void>
    getProfile: (token: string | null) => Promise<void>
    checkProfile: (token: string | null) => boolean
    updateProfile: (
        profileData: Partial<Profile>,
        token: string | null
    ) => Promise<{ status: number }>
    deleteProfile: (token: string | null) => Promise<void>
    addPhoto: (photo: string) => void
    removePhoto: (photoId: string) => void
    uploadNewPhotos: (token: string) => Promise<void>
}

const initialState: ProfileState & {
    tempPhotos: UserPicsType[]
    cloudUrls: string[]
} = {
    loading: true,
    success: false,
    error: false,
    data: null,
    hasProfile: null,
    errorData: null,
    tempPhotos: [],
    cloudUrls: [],
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            setToken: (token) => set({token}),
        }),
        {
            name: 'auth-storage',
        }
    )
)

export const useProfileStore = create<ProfileStore>()(
    devtools(
        (set, get) => {
            const resetState = () => set({...initialState})

            const handleError = (error: any, actionName: string) => {
                console.error(`❌ Error in ${actionName}:`, error)
                set({
                    loading: false,
                    error: true,
                    errorData: {
                        message: error.message || 'Unknown error',
                        status: error.response?.status,
                        details: error.response?.data,
                    },
                })
            }

            const fetchData = async (
                apiMethod: () => Promise<any>,
                actionName: string
            ) => {
                resetState()
                try {
                    const response = await apiMethod()
                    if (response.status >= 200 && response.status < 300) {
                        set({loading: false, success: true, data: response.data})
                        return response
                    } else {
                        console.error(`Unexpected status: ${response.status}`)
                    }
                } catch (error) {
                    handleError(error, actionName)
                    throw new Error('Error in connection with backend or endpoint!')
                }
            }

            return {
                ...initialState,

                setTempPhotos: (photos) => set({tempPhotos: photos}),
                setCloudUrls: (urls: string[]) => set({cloudUrls: urls}),
                clearTempPhotos: () => set({tempPhotos: []}),

                addTempPhoto: (photo) =>
                    set((s) => ({
                        tempPhotos: [
                            ...s.tempPhotos.filter((p) => p.id !== photo.id),
                            photo,
                        ],
                    })),

                removeTempPhoto: (id) =>
                    set((s) => ({
                        tempPhotos: s.tempPhotos.filter((p) => p.id !== id),
                    })),

                createProfile: async (profileData, token) => {
                    set({loading: true, error: false, success: false})
                    try {
                        const {tempPhotos} = get()
                        await apiCreateProfile(
                            {...profileData, photos: tempPhotos},
                            token || ''
                        )
                        set({tempPhotos: [], cloudUrls: []})
                        clearLocalStorage(['userPreferences'])
                        set({
                            loading: false,
                            success: true,
                            data: {...profileData, photos: []},
                        })
                    } catch (error) {
                        handleError(error, 'createProfile')
                    }
                },

                getProfile: async (token) =>
                    await fetchData(() => getProfile(token), 'getProfile'),

                checkProfile: async (token) => {
                    set({
                        loading: true,
                        success: false,
                        error: false,
                        hasProfile: null,
                        errorData: null,
                    })
                    try {
                        const response = await checkProfile(token)
                        if (response.status >= 200 && response.status < 300) {
                            set({loading: false, success: true, hasProfile: response.data})
                            return response
                        } else {
                            console.error(`Unexpected status: ${response.status}`)
                        }
                    } catch (error) {
                        handleError(error, 'checkProfile')
                        throw new Error('Error in connection with backend or endpoint!')
                    }
                },

                updateProfile: async (profileData, token) => {
                    const response = await fetchData(
                        () => updateProfile(profileData, token),
                        'updateProfile'
                    )
                    if (
                        response &&
                        response.status === 200 &&
                        (profileData.friendsDistance !== undefined ||
                            profileData.friendsAgeMin !== undefined ||
                            profileData.friendsAgeMax !== undefined)
                    ) {
                        const potentialFriendsStore = usePotentialFriendsStore.getState()
                        potentialFriendsStore.refreshPotentialFriends()
                    }
                    return response
                },

                deleteProfile: async (token) =>
                    await fetchData(() => deleteProfile(token), 'deleteProfile'),

                addPhoto: (photo: string) => {
                    set((state) => {
                        if (!state.data) return state
                        return {
                            data: {
                                ...state.data,
                                photos: [
                                    ...state.data.photos.filter((p) => p !== photo),
                                    photo,
                                ],
                            },
                        }
                    })
                },

                removePhoto: (photoUrl: string) => {
                    set((state) => {
                        if (!state.data) return state
                        return {
                            data: {
                                ...state.data,
                                photos: [
                                    ...(state.data.photos.filter((p) => p !== photoUrl) || []),
                                ],
                            },
                        }
                    })
                },

                uploadNewPhotos: async (token: string) => {
                    const {tempPhotos} = get()
                    const newPhotos = tempPhotos.filter((p) => p.blobFile)
                    if (newPhotos.length === 0) return

                    const formData = new FormData()
                    newPhotos.forEach((p) => formData.append('images', p.blobFile!))

                    const {data: cloudinaryUrls} = await axios.post<string[]>(
                        `${process.env.REACT_APP_API_BASE_URL}/api/photos/upload`,
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )

                    for (const photoUrl of cloudinaryUrls) {
                        await axios.post(
                            `${process.env.REACT_APP_API_BASE_URL}/api/photos`,
                            {photoUrl},
                            {headers: {Authorization: `Bearer ${token}`}}
                        )
                    }
                },
            }
        },
        {name: 'zustand store'}
    )
)