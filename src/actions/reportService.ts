import axiosInstance from './axiosInstance'
import { REPORT_ENDPOINT } from './endpoints'
import { blockUser } from './blockService'
import { getApiErrorMessage } from 'helpers/getApiErrorMessage'

export interface ReportData {
  reportedUserId: string
  reporterUserId: string
  reason: string
  comment: string
}

export const sendReport = async (reportData: ReportData) => {
  try {
    await blockUser(reportData.reportedUserId, reportData.reporterUserId)

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
