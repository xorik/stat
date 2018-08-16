import SettingsService from '@/service/SettingsService'

export default class State {
    public settings: ISettings = SettingsService.get()
    public stat: number[] = []
}
