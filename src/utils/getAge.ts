/**
 * @file Utility function to calculate age from a birthdate string.
 * @module utils/getAge
 */

/**
 * Calculates the age based on the given birthdate string.
 *
 * @param {string} birthDateString - The birthdate in ISO format (e.g., "1992-03-09T22:00:00.000Z").
 * @returns {number} The calculated age.
 *
 * @example
 * ```ts
 * const age = getAge("1992-03-09T22:00:00.000Z"); // Returns age in years
 * console.log(age);
 * ```
 */
export function getAge(birthDateString: string): number {
  const birthDate = new Date(birthDateString)
  const today = new Date()

  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  const dayDiff = today.getDate() - birthDate.getDate()

  // Adjust if the birthday hasn't occurred yet this year
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--
  }

  return age
}
