const STORAGE_PATH = "settings";
const DEFAULT_SETTINGS = {
  workingHours: [9, 20],
  plan: [240, 240, 240, 240, 240, 240, 0]
};

class SettingsService {
  static get() {
    let data = localStorage.getItem(STORAGE_PATH);
    return data === null ? DEFAULT_SETTINGS : JSON.parse(data);
  }

  static getDefault() {
    return DEFAULT_SETTINGS;
  }

  static save(data) {
    localStorage.setItem(STORAGE_PATH, JSON.stringify(data));
  }

  static reset() {
    localStorage.removeItem(STORAGE_PATH);
  }
}

export default SettingsService;
