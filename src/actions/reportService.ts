import axiosInstance from './axiosInstance'
import { REPORT_ENDPOINT } from './endpoints'
import { getApiErrorMessage } from 'helpers/getApiErrorMessage'

export interface ReportData {
  reportedUserId: string
  reason: string
  comment: string
}

export const sendReport = async (reportData: ReportData) => {
  try {
    const response = await axiosInstance.post(REPORT_ENDPOINT, {
      ...reportData,
      createdAt: new Date().toISOString(),
      status: 'pending',
    })
    return response.data
  } catch (error) {
    console.error('Error sending report:', error)
    throw new Error(getApiErrorMessage(error) || 'Failed to send report')
  }
}
