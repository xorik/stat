import SettingsService, { Settings } from '@/service/SettingsService'

export default class State {
  public settings: Settings

  constructor() {
    this.settings = SettingsService.get()
  }
}
