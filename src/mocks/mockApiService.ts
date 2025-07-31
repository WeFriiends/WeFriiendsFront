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
      { src: '/img/tempGirls/girl1-450.jpg' },
      { src: '/img/tempGirls/girl2-450.jpg' },
      { src: '/img/tempGirls/girl3-900.jpg' },
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
      { src: '/img/tempGirls/girl4-675.jpg' },
      { src: '/img/tempGirls/girl5-450.jpg' },
      { src: '/img/tempGirls/girl6-900.jpg' },
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
    id: '13',
    name: 'Valentina M',
    age: '38',
    photos: [
      { src: '/img/tempGirls/girl7-675.jpg' },
      { src: '/img/tempGirls/girl8-675.jpg' },
      { src: '/img/tempGirls/girl9-450.jpg' },
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
    id: '14',
    name: 'Katya N',
    age: '40',
    photos: [
      { src: '/img/tempGirls/girl10-450.jpg' },
      { src: '/img/tempGirls/girl11-900.jpg' },
      { src: '/img/tempGirls/girl12-900.jpg' },
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
  {
    id: '15',
    name: 'Elena S',
    age: '36',
    photos: [
      { src: '/img/tempGirls/girl13-900.jpg' },
      { src: '/img/tempGirls/girl14-675.jpg' },
      { src: '/img/tempGirls/girl15-675.jpg' },
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
    id: '16',
    name: 'Elena S',
    age: '36',
    photos: [
      { src: '/img/tempGirls/girl16-450.jpg' },
      { src: '/img/tempGirls/girl17-450.jpg' },
      { src: '/img/tempGirls/girl18-450.jpg' },
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
    id: '17',
    name: 'Elena S',
    age: '36',
    photos: [
      { src: '/img/tempGirls/girl19-450.jpg' },
      { src: '/img/tempGirls/girl20-450.jpg' },
      { src: '/img/tempGirls/girl1-450.jpg' },
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
    id: '18',
    name: 'Elena S',
    age: '36',
    photos: [
      { src: '/img/tempGirls/girl2-450.jpg' },
      { src: '/img/tempGirls/girl3-900.jpg' },
      { src: '/img/tempGirls/girl4-675.jpg' },
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
    id: '19',
    name: 'Elena S',
    age: '36',
    photos: [
      { src: '/img/tempGirls/girl5-450.jpg' },
      { src: '/img/tempGirls/girl6-900.jpg' },
      { src: '/img/tempGirls/girl7-675.jpg' },
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
    id: '20',
    name: 'Elena S',
    age: '36',
    photos: [
      { src: '/img/tempGirls/girl8-675.jpg' },
      { src: '/img/tempGirls/girl9-450.jpg' },
      { src: '/img/tempGirls/girl10-450.jpg' },
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
    id: '21',
    name: 'Elena S',
    age: '36',
    photos: [
      { src: '/img/tempGirls/girl11-900.jpg' },
      { src: '/img/tempGirls/girl12-900.jpg' },
      { src: '/img/tempGirls/girl13-900.jpg' },
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
    id: '22',
    name: 'Elena S',
    age: '36',
    photos: [
      { src: '/img/tempGirls/girl14-675.jpg' },
      { src: '/img/tempGirls/girl15-675.jpg' },
      { src: '/img/tempGirls/girl16-450.jpg' },
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
    id: '23',
    name: 'Elena S',
    age: '36',
    photos: [
      { src: '/img/tempGirls/girl17-450.jpg' },
      { src: '/img/tempGirls/girl18-450.jpg' },
      { src: '/img/tempGirls/girl19-450.jpg' },
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
    id: '24',
    name: 'Elena S',
    age: '36',
    photos: [
      { src: '/img/tempGirls/girl20-450.jpg' },
      { src: '/img/tempGirls/girl1-450.jpg' },
      { src: '/img/tempGirls/girl2-450.jpg' },
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
    id: '25',
    name: 'Elena S',
    age: '36',
    photos: [
      { src: '/img/tempGirls/girl3-900.jpg' },
      { src: '/img/tempGirls/girl4-675.jpg' },
      { src: '/img/tempGirls/girl5-450.jpg' },
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
    id: '26',
    name: 'Elena S',
    age: '36',
    photos: [
      { src: '/img/tempGirls/girl6-900.jpg' },
      { src: '/img/tempGirls/girl7-675.jpg' },
      { src: '/img/tempGirls/girl8-675.jpg' },
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
    id: '27',
    name: 'Elena S',
    age: '36',
    photos: [
      { src: '/img/tempGirls/girl9-450.jpg' },
      { src: '/img/tempGirls/girl10-450.jpg' },
      { src: '/img/tempGirls/girl11-900.jpg' },
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
    id: '28',
    name: 'Elena S',
    age: '36',
    photos: [
      { src: '/img/tempGirls/girl12-900.jpg' },
      { src: '/img/tempGirls/girl13-900.jpg' },
      { src: '/img/tempGirls/girl14-675.jpg' },
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
    id: '29',
    name: 'Elena S',
    age: '36',
    photos: [
      { src: '/img/tempGirls/girl15-675.jpg' },
      { src: '/img/tempGirls/girl16-450.jpg' },
      { src: '/img/tempGirls/girl17-450.jpg' },
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
    id: '30',
    name: 'Elena S',
    age: '36',
    photos: [
      { src: '/img/tempGirls/girl18-450.jpg' },
      { src: '/img/tempGirls/girl19-450.jpg' },
      { src: '/img/tempGirls/girl20-450.jpg' },
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
]

// Ready-to-use mock data for last messages (already in UserLastMessage format)
const mockLastMessages: UserLastMessage[] = [
  {
    id: '101',
    avatar: '/img/tempGirls/girl1-450.jpg',
    name: 'Elena S',
    age: '38',
    lastMessage: "Hello! Nice to meet you! I'm Elena",
    messageCount: '1',
  },
  {
    id: '102',
    avatar: '/img/tempGirls/girl2-450.jpg',
    name: 'Elena T',
    age: '40',
    lastMessage: "Hello! Nice to meet you! I'm Elena. Can...",
    messageCount: '3',
  },
  {
    id: '103',
    avatar: '/img/tempGirls/girl3-900.jpg',
    name: 'Elena M',
    age: '36',
    lastMessage: "Hello! Nice to meet you! I'm Elena",
    messageCount: '0',
  },
  {
    id: '104',
    avatar: '/img/tempGirls/girl4-675.jpg',
    name: 'Elena Antonova',
    age: '42',
    lastMessage: "Hello! Nice to meet you! I'm Elena",
    messageCount: '1',
  },
  {
    id: '105',
    avatar: '/img/tempGirls/girl5-450.jpg',
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
      //console.log('Using mock data for friends')
      return { data: mockFriends }
    }
    return { data: [] }
  },

  // Get last messages data (returns UserLastMessage[])
  getLastMessages: async (): Promise<{ data: UserLastMessage[] }> => {
    if (shouldUseMockData()) {
      //console.log('Using mock data for messages')
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
