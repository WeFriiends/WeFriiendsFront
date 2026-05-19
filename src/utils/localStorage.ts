export const setItemToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getItemFromLocalStorage = (key: string) => {
  try {
    const value = localStorage.getItem(key)
    // Parse only if value is not null
    return value && value !== 'undefined' ? JSON.parse(value) : null
  } catch (e) {
    console.error('Error parsing localStorage item', e)
    return null // Return null if an error occurs during parsing
  }
}

export const getItemsFromLocalStorage = (keys: string[]) => {
  const items: { [key: string]: any } = {}
  keys.forEach((key) => {
    const item = getItemFromLocalStorage(key)
    if (item !== null) {
      items[key] = item
    }
  })
  return items
}

/**
 * Clears specific keys or all data from localStorage.
 * @param keys - An array of keys to clear. If not provided, clears all localStorage data.
 */
export const clearLocalStorage = (keys?: string[]) => {
  if (keys && keys.length > 0) {
    keys.forEach((key) => {
      localStorage.removeItem(key)
    })
  } else {
    localStorage.clear() // Clears all data from localStorage
  }
}

/**
 * Removes all localStorage keys that start with the given prefix.
 * @param prefix - The prefix to match against localStorage keys.
 */
export const clearLocalStorageByPrefix = (prefix: string) => {
  Object.keys(localStorage)
    .filter((key) => key.startsWith(prefix))
    .forEach((key) => localStorage.removeItem(key))
}
