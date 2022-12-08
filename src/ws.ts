import { WebSocketClient, WebSocketServer } from 'ws'
import { Data } from './types.ts'

export function runWS(onEvent: (cb: (data: Data) => void) => void) {
  const port = Number(Deno.env.get('WS_PORT') || '3000')
  const wss = new WebSocketServer(port)
  wss.on('connection', (ws: WebSocketClient) => {
    console.log('hi')
    onEvent(data => {
      ws.send(JSON.stringify(data))
    })
  })
  wss.on('error', e => {
    console.log('error', e)
  })
}
