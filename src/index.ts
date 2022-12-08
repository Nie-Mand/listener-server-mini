// import { WebSocketClient, WebSocketServer } from "ws";
import 'load-dotenv'
import { main } from './main.ts'

main()

// const wss = new WebSocketServer(8080);
// wss.on("connection", function (ws: WebSocketClient) {
//   ws.on("message", function (message: string) {
//     console.log(message);
//     ws.send(message);
//   });
// });
