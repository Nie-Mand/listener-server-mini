import 'load-dotenv'
import { runWS } from './ws.ts'
import { runHTTP } from './http.ts'
import { createChannel } from './channel.ts'

const channel = createChannel()

runWS(channel.onEvent)
runHTTP(channel.emit)
