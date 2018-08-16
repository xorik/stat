class UpworkStatSocketService {
  constructor(callback: (this: WebSocket, ev: MessageEvent) => any) {
    const socket = new WebSocket('wss://stat.xorik.ru/ws/')

    socket.onopen = (): void => {
      socket.send('CLIENT')
    }

    socket.onmessage = callback
  }
}

export default UpworkStatSocketService
