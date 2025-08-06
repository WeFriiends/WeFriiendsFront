/**
 * Utility functions for working with mock data
 */

/**
 * Checks if the URL has the 'fill' parameter, which indicates that mock data should be used
 * @returns {boolean} True if mock data should be used, false otherwise
 */
export const shouldUseMockData = (): boolean => {
  if (typeof window !== 'undefined') {
    return (
      window.location.search.includes('?fill') ||
      window.location.search.includes('&fill')
    )
  }
  return false
}
