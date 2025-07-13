// Mock API service for handling mock data
import { UserProfileData } from 'types/UserProfileData'
import { UserLastMessage } from 'types/UserLastMessage'
import { shouldUseMockData } from '../utils/mockUtils'

// Ready-to-use mock data for friends (already in UserProfileData format)
const mockFriends: UserProfileData[] = [
  {
    id: '11',
    name: 'Elena S',
    age: '36',
    photos: [
      { src: '/img/photo_Elena.jpg' },
      { src: '/img/photo_Elena_2.jpg' },
      { src: '/img/photo_Elena_3.jpg' },
    ],
    city: 'Madrid',
    distance: '10 miles',
    likedMe: true,
    reasons: [
      'Looking for new friends',
      "I'm learning a new language. Let's talk!",
      "Let's be friends, I'm new in town",
    ],
    preferences: {
      smoking: 'Non-Smoker',
      education: "master's degrees",
      children: '1 child',
      pets: ['dog', 'cat'],
    },
  },
  {
    id: '12',
    name: 'Polina T',
    age: '32',
    photos: [
      { src: '/img/photo_Elena_3.jpg' },
      { src: '/img/photo_Elena_2.jpg' },
      { src: '/img/photo_Elena.jpg' },
    ],
    city: 'Paris',
    distance: '10 miles',
    likedMe: true,
    reasons: [
      'My plans are to move abroad',
      "I'm a new mom. Need some help",
      "Let's take the dogs for a walk",
    ],
    preferences: {
      smoking: 'Non-Smoker',
      education: "bachelor's degrees",
      children: 'None',
      drink: 'Less than monthly',
      pets: ['dog'],
      language: ['english'],
    },
  },
  {
    id: '2',
    name: 'Valentina M',
    age: '38',
    photos: [
      { src: '/img/friends/friends_photo2.jpg' },
      { src: '/img/photo_Elena_3.jpg' },
      { src: '/img/photo_Elena.jpg' },
    ],
    city: 'Berlin',
    distance: '10 miles',
    likedMe: true,
    reasons: [
      "I'm learning a new language. Let's talk!",
      "Let's be friends, I'm new in town",
    ],
    preferences: {},
  },
  {
    id: '3',
    name: 'Katya N',
    age: '40',
    photos: [
      { src: '/img/friends/friends_photo3.jpg' },
      { src: '/img/photo_Elena_3.jpg' },
      { src: '/img/photo_Elena.jpg' },
    ],
    city: 'Roma',
    distance: '10 miles',
    likedMe: false,
    reasons: [
      "I'm learning a new language. Let's talk!",
      "Let's be friends, I'm new in town",
    ],
    preferences: {},
  },
]

// Ready-to-use mock data for last messages (already in UserLastMessage format)
const mockLastMessages: UserLastMessage[] = [
  {
    id: '1',
    avatar: '/img/photo_Elena.jpg',
    name: 'Elena S',
    age: '38',
    lastMessage: "Hello! Nice to meet you! I'm Elena",
    messageCount: '1',
  },
  {
    id: '2',
    avatar: '/img/photo_Elena_2.jpg',
    name: 'Elena T',
    age: '40',
    lastMessage: "Hello! Nice to meet you! I'm Elena. Can...",
    messageCount: '3',
  },
  {
    id: '3',
    avatar: '/img/photo_Elena_3.jpg',
    name: 'Elena M',
    age: '36',
    lastMessage: "Hello! Nice to meet you! I'm Elena",
    messageCount: '0',
  },
  {
    id: '4',
    avatar: '/img/photo_Elena.jpg',
    name: 'Elena Antonova',
    age: '42',
    lastMessage: "Hello! Nice to meet you! I'm Elena",
    messageCount: '1',
  },
  {
    id: '5',
    avatar: '/img/photo_Elena.jpg',
    name: 'Elena Petrova',
    age: '35',
    lastMessage: "Hello! Nice to meet you! I'm Elena",
    messageCount: '1',
  },
]

// Mock API service with simplified implementation
export const mockApiService = {
  // Get friends data (returns UserProfileData[])
  getFriends: async (): Promise<{ data: UserProfileData[] }> => {
    if (shouldUseMockData()) {
      console.log('Using mock data for friends')
      return { data: mockFriends }
    }
    return { data: [] }
  },

  // Get last messages data (returns UserLastMessage[])
  getLastMessages: async (): Promise<{ data: UserLastMessage[] }> => {
    if (shouldUseMockData()) {
      console.log('Using mock data for messages')
      return { data: mockLastMessages }
    }
    return { data: [] }
  },

  // Legacy get method for backward compatibility
  get: async (
    url: string
  ): Promise<{ data: UserProfileData[] } | { data: UserLastMessage[] }> => {
    if (shouldUseMockData()) {
      console.log('Using mock data for', url)

      if (url === 'newFriends' || url === 'profile/search') {
        return { data: mockFriends }
      } else if (url === 'lastMessages') {
        return { data: mockLastMessages }
      }
    }

    // Return empty data with appropriate type
    if (url === 'lastMessages') {
      return { data: [] as UserLastMessage[] }
    } else {
      return { data: [] as UserProfileData[] }
    }
  },

  post: async (url: string, data: any): Promise<{ status: number }> => {
    console.log('Mock POST request to', url, 'with data', data)
    return { status: 200 }
  },

  delete: async (url: string): Promise<{ status: number }> => {
    console.log('Mock DELETE request to', url)
    return { status: 200 }
  },
}
