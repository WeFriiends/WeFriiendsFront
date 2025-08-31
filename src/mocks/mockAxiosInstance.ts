import { mockApiService } from './mockApiService'
import { UserProfileData } from 'types/UserProfileData'
import { UserLastMessage } from 'types/UserLastMessage'

// Create a simplified mock axios instance that uses the mock API service
const mockAxiosInstance = {
  get: async <T extends UserProfileData[] | UserLastMessage[] | any>(
    url: string
  ): Promise<{ data: T }> => {
    // Use the appropriate endpoint-specific method based on the URL
    if (url === 'newFriends' || url === 'profile/search') {
      const response = await mockApiService.getFriends()
      return { data: response.data as unknown as T }
    } else if (url === 'lastMessages') {
      const response = await mockApiService.getLastMessages()
      return { data: response.data as unknown as T }
    } else if (url === 'matches') {
      const response = await mockApiService.getMatches()
      return { data: response.data as unknown as T }
    }
    // Default case
    return { data: [] as unknown as T }
  },

  post: async (url: string, data: any) => {
    return mockApiService.post(url, data)
  },

  delete: async (url: string) => {
    return mockApiService.delete(url)
  },
}

export default mockAxiosInstance
