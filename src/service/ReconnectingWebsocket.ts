export type WebsocketStatus = 'offline' | 'connecting' | 'online'

abstract class ReconnectingWebsocket {
  protected connectTimeout: number = 5000
  protected defaultTimeout: number = 10000
  protected timeout: number = this.defaultTimeout
  protected timeoutFactor: number = 1.2

  constructor(private url: string) {
    this.url = url
  }

  public start(): void {
    this.reconnect()
  }

  protected abstract connectCallback(socket: WebSocket): void
  protected abstract messageCallback(socket: WebSocket, response: string): void
  protected statusCallback(status: WebsocketStatus): void {} // tslint:disable-line

  protected reconnect(): void {
    const socket = new WebSocket(this.url)
    this.statusCallback('connecting')

    const connectTimer = setTimeout(() => {
      socket.close()
    }, this.connectTimeout)

    socket.onopen = (): void => {
      clearTimeout(connectTimer)
      this.statusCallback('online')
      this.timeout = this.defaultTimeout
      this.connectCallback(socket)
    }

    socket.onmessage = (response: MessageEvent): void => {
      this.messageCallback(socket, response.data)
    }

    socket.onclose = (): void => {
      clearTimeout(connectTimer)
      this.statusCallback('offline')
      setTimeout(() => this.reconnect(), this.timeout)
      this.timeout *= this.timeoutFactor
    }
  }
}

export default ReconnectingWebsocket
