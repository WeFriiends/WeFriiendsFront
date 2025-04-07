/**
 * Validates an aboutMe string.
 * @param value - The name string to validate.
 * @returns True if validation passes, otherwise false.
 */
export const validateAboutMe = (value: string): boolean => {
  const regex = /^(?!.*[<>&]).*$/s
  return regex.test(value)
}
