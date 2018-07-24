class UpworkStatSocketService {
  constructor(callback) {
    let socket = new WebSocket("wss://stat.xorik.ru/ws/");

    socket.onopen = () => {
      socket.send("CLIENT");
    };

    socket.onmessage = callback;
  }
}

export default UpworkStatSocketService;
