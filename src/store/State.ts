import SettingsService from '@/service/SettingsService'
import {WebsocketStatus} from '@/service/ReconnectingWebsocket'

export default class State {
    public settings: ISettings = SettingsService.get()
    public upworkStat: number[] = Array(7).fill(0)
    public togglStat: number[] = Array(7).fill(0)
    public networkStatus: WebsocketStatus = 'offline'
}
