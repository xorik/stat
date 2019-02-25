import ReconnectingWebsocket from '@/service/ReconnectingWebsocket'

const TOGGL_WS_URL = 'wss://stream.toggl.com/ws'

type TogglCallback = (event: TogglEvent) => void

export interface TimeEntry {
  id: number,
  description: string,
  start: string,
  stop: string | null,
  duration: number
}

export const enum TogglAction {
  Update,
  Delete,
  Insert,
}

export interface TogglEvent {
  action: TogglAction,
  data: TimeEntry,
}

class TogglWebsocketService extends ReconnectingWebsocket {
  constructor(private token: string, private callback: TogglCallback) {
    super(TOGGL_WS_URL)
  }

  protected connectCallback(socket: WebSocket): void {
    const message = {
      type: 'authenticate',
      api_token: this.token,
    }

    socket.send(JSON.stringify(message))
  }

  protected messageCallback(socket: WebSocket, response: string): void {
    const data = JSON.parse(response)

    if (data.model === undefined) {
      socket.send('{"type": "pong"}')
      return
    }

    if (data.model !== 'time_entry') {
      return
    }

    data.action = this.convertAction(data.action)
    this.callback(data)
  }

  protected convertAction(action: string): TogglAction {
    if (action === 'UPDATE') {
      return TogglAction.Update
    }

    if (action === 'delete') {
      return TogglAction.Delete
    }

    if (action === 'INSERT') {
      return TogglAction.Insert
    }

    throw Error('Unexpected action' + action)
  }
}

export default TogglWebsocketService
