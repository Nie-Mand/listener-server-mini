import { serve } from 'http'
import { Data } from './types.ts'

export function runHTTP(emit: (data: Data) => void) {
  const port = Number(Deno.env.get('HTTP_PORT') || '3001')

  async function handler(_req: Request): Promise<Response> {
    const urlChunks = _req.url.split('/')
    const baseUrl = urlChunks[urlChunks.length - 1]
    if (baseUrl !== 'agent')
      return new Response(null, {
        status: 404,
      })

    try {
      const body: Data = await _req.json()
      console.log(body)

      if (!body.task || !body.task)
        return new Response(null, {
          status: 400,
        })

      emit(body)
      return new Response('ok')
    } catch {
      return new Response(null, {
        status: 400,
      })
    }
  }

  serve(handler, {
    port,
    onListen(params) {
      console.log(`Listening 🚀 on ${params.hostname}:${params.port}`)
    },
  })
}
