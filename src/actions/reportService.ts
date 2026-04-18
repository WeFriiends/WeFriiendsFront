import axiosInstance from './axiosInstance'
import { REPORT_ENDPOINTS } from './endpoints'
import { blockUser } from './blockService'

export interface ReportData {
  reportedUserId: string
  reporterUserId: string
  reason: string
  comment: string
}

export const sendReport = async (reportData: ReportData) => {
  console.log('💎💎💎 На бэкенд будет отправлено:', reportData)
  try {
    //  блокируем пользователя (удаляем матч и чат)
    await blockUser(reportData.reportedUserId, reportData.reporterUserId)

    // отправляем жалобу
    const response = await axiosInstance.post(REPORT_ENDPOINTS.create, {
      ...reportData,
      createdAt: new Date().toISOString(),
      status: 'pending',
    })
    return response.data
  } catch (error) {
    console.error('Error sending report:', error)
    throw error
  }
}
