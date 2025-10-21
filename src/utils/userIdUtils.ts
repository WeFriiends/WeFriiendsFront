/**
 * Removes the "auth0|" prefix from a user ID
 * @param userId The user ID that may contain the "auth0|" prefix
 * @returns The user ID without the "auth0|" prefix
 */
export const cleanUserId = (userId: string): string => {
  return userId.replace('auth0|', '')
}
