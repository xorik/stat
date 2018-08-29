import SettingsService from '@/service/SettingsService'
import {WebsocketStatus} from '@/service/ReconnectingWebsocket'

export default class State {
    public settings: ISettings = SettingsService.get()
    public upworkStat: number[] = []
    public networkStatus: WebsocketStatus = 'offline'
}
