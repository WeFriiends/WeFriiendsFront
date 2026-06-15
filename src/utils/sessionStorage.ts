export const setItemToSessionStorage = (key: string, value: unknown): void => {
  sessionStorage.setItem(key, JSON.stringify(value))
}

export const getItemFromSessionStorage = <T = unknown>(
  key: string
): T | null => {
  try {
    const raw = sessionStorage.getItem(key)
    if (raw === null) return null
    return JSON.parse(raw) as T
  } catch {
    console.error(`sessionStorage: failed to parse value for key "${key}"`)
    return null
  }
}

export const getRequiredItemFromSessionStorage = <T = unknown>(
  key: string
): T => {
  const value = getItemFromSessionStorage<T>(key)
  if (value === null) {
    throw new Error(
      `sessionStorage: required value for key "${key}" is missing`
    )
  }
  return value
}

export const clearSessionStorage = (keys?: string[]): void => {
  if (keys?.length) {
    keys.forEach((key) => sessionStorage.removeItem(key))
  } else {
    sessionStorage.clear()
  }
}
