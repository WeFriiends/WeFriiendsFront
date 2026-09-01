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
  let response

  // The report goes first: a failed block must never silently swallow
  // the complaint, and a failed report must never leave the user blocked.
  try {
    response = await axiosInstance.post(REPORT_ENDPOINT, {
      ...reportData,
      createdAt: new Date().toISOString(),
      status: 'pending',
    })
  } catch (error) {
    console.error('Error sending report:', error)
    throw new Error(getApiErrorMessage(error) || 'Failed to send report')
  }

  try {
    await blockUser(reportData.reportedUserId, reportData.reporterUserId)
  } catch (error) {
    console.error('Error blocking user after report:', error)
    throw new Error(
      getApiErrorMessage(error) ||
        'Your report was sent, but we could not block this user. Please try blocking again.'
    )
  }

  return response.data
}
