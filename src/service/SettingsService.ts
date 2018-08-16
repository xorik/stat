const STORAGE_PATH = 'settings'
const DEFAULT_SETTINGS = {
  workingHours: [9, 20],
  plan: [300, 300, 300, 300, 300, 300, 0],
}

class SettingsService {
  public static get(): ISettings {
    const data = localStorage.getItem(STORAGE_PATH)
    return data === null ? DEFAULT_SETTINGS : JSON.parse(data)
  }

  public static getDefault(): ISettings {
    return DEFAULT_SETTINGS
  }

  public static save(data: ISettings): void {
    localStorage.setItem(STORAGE_PATH, JSON.stringify(data))
  }

  public static reset(): void {
    localStorage.removeItem(STORAGE_PATH)
  }
}

export default SettingsService
