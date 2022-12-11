import { serve } from 'http'
import { createChannel } from './channel.ts'
import { Data } from './types.ts'

export function run() {
  const port = Number(Deno.env.get('PORT') || '3001')

  const { onEvent, emit } = createChannel()

  async function handler(_req: Request): Promise<Response> {
    console.log('headers.upgrade', _req.headers.get('upgrade'))

    const urlChunks = _req.url.split('/')
    const baseUrl = urlChunks[urlChunks.length - 1]

    if (baseUrl === 'agent') {
      try {
        const body: Data = await _req.json()
        if (!body.team || !body.chall)
          return new Response(null, {
            status: 400,
          })

        emit(body)
        return new Response('ok')
      } catch (e) {
        console.log('YYYY-error:', e)

        return new Response(null, {
          status: 400,
        })
      }
    }

    if (baseUrl === 'listen') {
      try {
        console.log('headers.upgrade', _req.headers.get('upgrade'))

        if (_req.headers.get('upgrade') != 'websocket') {
          return new Response(null, { status: 501 })
        }
        const { response, socket } = Deno.upgradeWebSocket(_req)
        socket.onopen = () => {
          console.log('hi')
          onEvent(data => {
            if (socket.readyState !== WebSocket.OPEN) {
              console.log('socket is not open')
              return
            }
            console.log('sending data')
            socket.send(JSON.stringify(data))
          })
        }
        socket.onerror = e => console.log('socket errored:', e)
        socket.onclose = () => console.log('bye')
        return response
      } catch (e) {
        console.log('XXX-error:', e)
        return new Response(null, {
          status: 500,
          statusText: 'Oops',
        })
      }
    }

    return new Response(null, {
      status: 404,
    })
  }

  serve(handler, {
    port,
    onListen(params) {
      console.log(`Listening 🚀 on ${params.hostname}:${params.port}`)
    },
  })
}
