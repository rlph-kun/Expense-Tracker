const KEY = 'expense-tracker-entries'
const THEME_KEY = 'expense-tracker-theme'

export function loadEntries() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    console.error('loadEntries', e)
    return []
  }
}

export function saveEntries(entries) {
  try {
    localStorage.setItem(KEY, JSON.stringify(entries))
  } catch (e) {
    console.error('saveEntries', e)
  }
}

export function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch (e) {
    console.error('saveTheme', e)
  }
}

export function loadTheme() {
  try {
    return localStorage.getItem(THEME_KEY) || 'light'
  } catch (e) {
    return 'light'
  }
}
