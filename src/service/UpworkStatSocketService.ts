import ReconnectingWebsocket, {WebsocketStatus} from '@/service/ReconnectingWebsocket'
import store from '@/store'

class UpworkStatSocketService extends ReconnectingWebsocket {
  constructor() {
    super('wss://stat.xorik.ru/ws/')
  }

  protected connectCallback(socket: WebSocket): void {
    socket.send('CLIENT')
  }

  protected messageCallback(socket: WebSocket, response: string): void {
    store.commit('updateStat', JSON.parse(response))
  }

  protected statusCallback(status: WebsocketStatus): void {
    store.commit('updateNetworkStatus', status)
  }
}

export default UpworkStatSocketService
