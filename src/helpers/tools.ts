import { Cell, GridSettings } from '@/types/Grid'
import { i18n } from '@/i18n'

export const debounce = (cb: (...args: any[]) => void, delay?: number) => {
  let timeout: number | undefined = undefined
  return (...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      return cb.apply(args)
    }, delay)
  }
}
export const lowerString = (txt: string) =>
  typeof txt === 'string' ? txt.toLowerCase() : typeof txt === 'number' ? txt : ''
// https://stackoverflow.com/questions/33780271/export-a-json-object-to-a-text-file
// https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
interface FileDataToExport {
    grid: Cell[]
    boardSize: number | string
}

export const exportToJson = (myData: FileDataToExport, fileName: string = 'File') => {
  
  const dataStr = JSON.stringify(myData, null, 2)
  const blob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  const today = new Date().toLocaleDateString('en-US')
  link.download = `${fileName} as of ${today}.json`
  link.click()
  URL.revokeObjectURL(url)
}
// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText
export const getJsonFile = async (e: Event): Promise<FileDataToExport> => {
  return new Promise((resolve, reject) => {
    const target = e.target as HTMLInputElement
    const file = target?.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const output = JSON.parse(reader?.result as string) as FileDataToExport
        return resolve(output)
      } catch (err) {
        return reject(`Failed Getting JSON data: ${err}`)
      }
    }
    reader.readAsText(file)
  })
}

export const refreshAppLanguageAndTheme = (storedSettingsData: GridSettings) => {
  if (!storedSettingsData) return
  const storedData = storedSettingsData
  const { language, mode } = storedData || {}
  i18n.global.locale.value = language || 'en'

  const changeThemeMode = (isDark: boolean) => {
    if (isDark) {
     
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light'); 
  }

  function handleColorSchemeChange(e: MediaQueryListEvent) {
    const isDark = e.matches
    changeThemeMode(isDark)
  }
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  if (mode === '') {
    // if system is opted - checks and still listens for a dark mode change and reflects it 
    mediaQuery.addEventListener('change', handleColorSchemeChange)
    const isDark = mediaQuery?.matches
    changeThemeMode(isDark)
  } else {
    // otherwise, if a specific mode is opted light/dark, reflect it
    const isDark = lowerString(mode) === 'dark'
    changeThemeMode(isDark)

    mediaQuery.removeEventListener('change', handleColorSchemeChange)
  }
}
