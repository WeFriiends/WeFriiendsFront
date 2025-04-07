/**
 * Validates a name string.
 * @param value - The name string to validate.
 * @returns True if validation passes, otherwise false.
 */
export const validateName = (value: string): boolean => {
  if (!value) return false
  const regex = /^[\p{L} ]{2,15}$/u
  return (
    regex.test(value) &&
    !value.startsWith(' ') &&
    !value.endsWith(' ') &&
    value !== ''
  )
}
