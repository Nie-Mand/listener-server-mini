import { PubSub } from 'pubsub'
import { Data } from './types.ts'
import EventEmitter from 'events'

class Event extends EventEmitter {}

export function createChannel() {
  const channel = new Event()

  function emit(data: Data) {
    console.log('here Z')

    channel.emit(JSON.stringify(data))
  }

  function onEvent(cb: (data: Data) => void) {
    channel.on('event', (msg: string) => {
      const data = JSON.parse(msg.toString())
      cb(data)
    })
  }

  return {
    emit,
    onEvent,
  }
}
