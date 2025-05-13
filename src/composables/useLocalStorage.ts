import { onBeforeUnmount } from 'vue'
// types
type StorageData = Record<string, any>
type cb = (data: StorageData) => void
const initialData = {
    // grid data
    grid: [],
    // settings
    settings: {
      language: "en",
      mode: 'light',
      showGridLines: true,
      gameSpeed: 5,
      boardSize: "",
      palette: ""
    }

}
export function useLocalStorage(defaultData: StorageData = initialData, storageKey: string = 'conway') {
  const getStorage = (): StorageData => {
    try {
      const raw = localStorage.getItem(storageKey)
      return raw ? JSON.parse(raw) : {}
    } catch {
      return {}
    }
  }

  const saveStorage = (data: StorageData): void => {
    localStorage.setItem(storageKey, JSON.stringify(data))
    window.dispatchEvent(new Event('storage'))
  }

  const setItem = (key: string, value: any): void => {

    if (!key) return

    const storage = getStorage()
    const updated = {
      ...defaultData,
      ...storage,
      [key]: value,
    }

    saveStorage(updated)
  }

  const getItem = (key?: string): any => {
    const storage = getStorage()
    return key ? (storage[key] ?? null) : storage
  }

  const deleteItem = (key: string): void => {
    if (!key) return

    const storage = getStorage()
    if (key in storage) {
      delete storage[key]
      saveStorage(storage)
    }
  }

  const resetStorage = (): any => {
    saveStorage(defaultData)
    return defaultData;
  }

  const clearStorage = (): void => {
    saveStorage({})
  }

  const addStorageListener = (callback: cb): void => {
    if (typeof callback !== 'function') return

    const handler = () => callback(getStorage())
    window.addEventListener('storage', handler)

    onBeforeUnmount(() => {
      window.removeEventListener('storage', handler)
    })
  }

  return {
    initialData,
    setItem,
    getItem,
    deleteItem,
    resetStorage,
    clearStorage,
    addStorageListener,
  }
}
