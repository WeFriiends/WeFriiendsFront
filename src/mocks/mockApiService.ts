// Mock API service for handling mock data
import { UserProfileData } from 'types/UserProfileData'
import { UserLastMessage } from 'types/UserLastMessage'
import { FriendsMatch } from 'types/Matches'
import { shouldUseMockData } from '../utils/mockUtils'

// Ready-to-use mock data for friends (already in UserProfileData format)
export const mockFriends: UserProfileData[] = [
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

// Ready-to-use mock data for matches (already in FriendsMatch format)
const mockMatches: FriendsMatch[] = [
  {
    id: '11',
    name: 'Elena S',
    age: 36,
    photo: '/img/tempGirls/girl1-450.jpg',
  },
  {
    id: '12',
    name: 'Polina T',
    age: 32,
    photo: '/img/tempGirls/girl4-675.jpg',
  },
  {
    id: '13',
    name: 'Valentina M',
    age: 38,
    photo: '/img/tempGirls/girl7-675.jpg',
  },
  {
    id: '14',
    name: 'Katya N',
    age: 40,
    photo: '/img/tempGirls/girl10-450.jpg',
  },
  {
    id: '15',
    name: 'Elena S',
    age: 36,
    photo: '/img/tempGirls/girl13-900.jpg',
  },
  {
    id: '16',
    name: 'Elena S',
    age: 36,
    photo: '/img/tempGirls/girl16-450.jpg',
  },
  {
    id: '17',
    name: 'Elena S',
    age: 36,
    photo: '/img/tempGirls/girl19-450.jpg',
  },
  {
    id: '18',
    name: 'Elena S',
    age: 36,
    photo: '/img/tempGirls/girl2-450.jpg',
  },
  {
    id: '19',
    name: 'Elena S',
    age: 36,
    photo: '/img/tempGirls/girl5-450.jpg',
  },
  {
    id: '20',
    name: 'Elena S',
    age: 36,
    photo: '/img/tempGirls/girl8-675.jpg',
  },
  {
    id: '21',
    name: 'Elena S',
    age: 36,
    photo: '/img/tempGirls/girl11-900.jpg',
  },
  {
    id: '22',
    name: 'Elena S',
    age: 36,
    photo: '/img/tempGirls/girl14-675.jpg',
  },
  {
    id: '23',
    name: 'Elena S',
    age: 36,
    photo: '/img/tempGirls/girl17-450.jpg',
  },
  {
    id: '24',
    name: 'Elena S',
    age: 36,
    photo: '/img/tempGirls/girl20-450.jpg',
  },
  {
    id: '25',
    name: 'Elena S',
    age: 36,
    photo: '/img/tempGirls/girl3-900.jpg',
  },
  {
    id: '26',
    name: 'Elena S',
    age: 36,
    photo: '/img/tempGirls/girl6-900.jpg',
  },
  {
    id: '27',
    name: 'Elena S',
    age: 36,
    photo: '/img/tempGirls/girl9-450.jpg',
  },
  {
    id: '28',
    name: 'Elena S',
    age: 36,
    photo: '/img/tempGirls/girl12-900.jpg',
  },
  {
    id: '29',
    name: 'Elena S',
    age: 36,
    photo: '/img/tempGirls/girl15-675.jpg',
  },
  {
    id: '30',
    name: 'Elena S',
    age: 36,
    photo: '/img/tempGirls/girl18-450.jpg',
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
    conversationRef: 'conversation_101',
    lastMessageSeen: false,
  },
  {
    id: '102',
    avatar: '/img/tempGirls/girl2-450.jpg',
    name: 'Elena T',
    age: '40',
    lastMessage: "Hello! Nice to meet you! I'm Elena. Can...",
    messageCount: '3',
    conversationRef: 'conversation_102',
    lastMessageSeen: false,
  },
  {
    id: '103',
    avatar: '/img/tempGirls/girl3-900.jpg',
    name: 'Elena M',
    age: '36',
    lastMessage: "Hello! Nice to meet you! I'm Elena",
    messageCount: '0',
    conversationRef: 'conversation_103',
    lastMessageSeen: true,
  },
  {
    id: '104',
    avatar: '/img/tempGirls/girl4-675.jpg',
    name: 'Elena Antonova',
    age: '42',
    lastMessage: "Hello! Nice to meet you! I'm Elena",
    messageCount: '1',
    conversationRef: 'conversation_104',
    lastMessageSeen: false,
  },
  {
    id: '106',
    avatar: '/img/tempGirls/girl5-450.jpg',
    name: 'Elena Petrova',
    age: '35',
    lastMessage: "Hello! Nice to meet you! I'm Elena",
    messageCount: '1',
    conversationRef: 'conversation_106',
    lastMessageSeen: false,
  },
  {
    id: '107',
    avatar: '/img/tempGirls/girl1-450.jpg',
    name: 'Elena S',
    age: '38',
    lastMessage: "Hello! Nice to meet you! I'm Elena",
    messageCount: '1',
    conversationRef: 'conversation_107',
    lastMessageSeen: true,
  },
  {
    id: '108',
    avatar: '/img/tempGirls/girl2-450.jpg',
    name: 'Elena T',
    age: '40',
    lastMessage: "Hello! Nice to meet you! I'm Elena. Can...",
    messageCount: '3',
    conversationRef: 'conversation_108',
    lastMessageSeen: false,
  },
  {
    id: '109',
    avatar: '/img/tempGirls/girl3-900.jpg',
    name: 'Elena M',
    age: '36',
    lastMessage: "Hello! Nice to meet you! I'm Elena",
    messageCount: '0',
    conversationRef: 'conversation_109',
    lastMessageSeen: true,
  },
  {
    id: '110',
    avatar: '/img/tempGirls/girl4-675.jpg',
    name: 'Elena Antonova',
    age: '42',
    lastMessage: "Hello! Nice to meet you! I'm Elena",
    messageCount: '1',
    conversationRef: 'conversation_110',
    lastMessageSeen: false,
  },
  {
    id: '111',
    avatar: '/img/tempGirls/girl5-450.jpg',
    name: 'Elena Petrova',
    age: '35',
    lastMessage: "Hello! Nice to meet you! I'm Elena",
    messageCount: '1',
    conversationRef: 'conversation_111',
    lastMessageSeen: true,
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

  // Get matches data (returns FriendsMatch[])
  getMatches: async (): Promise<{ data: FriendsMatch[] }> => {
    if (shouldUseMockData()) {
      //console.log('Using mock data for matches')
      return { data: mockMatches }
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
  ): Promise<
    | { data: UserProfileData[] }
    | { data: UserLastMessage[] }
    | { data: FriendsMatch[] }
  > => {
    if (shouldUseMockData()) {
      console.log('Using mock data for', url)

      if (url === 'newFriends' || url === 'profile/search') {
        return { data: mockFriends }
      } else if (url === 'lastMessages') {
        return { data: mockLastMessages }
      } else if (url === 'matches') {
        return { data: mockMatches }
      }
    }

    // Return empty data with appropriate type
    if (url === 'lastMessages') {
      return { data: [] as UserLastMessage[] }
    } else if (url === 'matches') {
      return { data: [] as FriendsMatch[] }
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
