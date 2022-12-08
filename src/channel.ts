import { PubSub } from 'pubsub'
import { Data } from './types.ts'

export function createChannel() {
  const channel = new PubSub()

  function emit(data: Data) {
    channel.publish(JSON.stringify(data))
  }

  function onEvent(cb: (data: Data) => void) {
    channel.subscribe(String, msg => {
      const data = JSON.parse(msg.toString())
      cb(data)
    })
  }

  return {
    emit,
    onEvent,
  }
}
