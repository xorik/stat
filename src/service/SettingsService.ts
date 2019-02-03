const STORAGE_PATH = 'settings'
const DEFAULT_SETTINGS = {
  workingHours: [9, 20],
  plan: [420, 420, 420, 420, 420, 0, 0],
}

export interface Settings {
  workingHours: number[],
  plan: number[],
}

class SettingsService {
  public static get(): Settings {
    const data = localStorage.getItem(STORAGE_PATH)
    return (data === null) ? DEFAULT_SETTINGS : JSON.parse(data)
  }

  public static save(data: Settings): void {
    localStorage.setItem(STORAGE_PATH, JSON.stringify(data))
  }
}

export default SettingsService
