import axiosInstance from './axiosInstance'
import { UserLastMessage } from 'types/UserLastMessage'
import mockAxiosInstance from '../mocks/mockAxiosInstance'
import { shouldUseMockData } from '../utils/mockUtils'

export const getLastMessages = async (
  id: string
): Promise<UserLastMessage[] | undefined> => {
  try {
    // Check if we should use mock data
    if (shouldUseMockData()) {
      console.log('Using mock data for messages')
      const response = await mockAxiosInstance.get<UserLastMessage[]>(
        'lastMessages'
      )
      return response.data
    }

    // Otherwise use the original API call
    const response = await axiosInstance.get(id)
    return response.data
  } catch (error) {
    console.error('Error fetching data for last messages')
    return []
  }
}
