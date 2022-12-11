import { Data } from './types.ts'
import EventEmitter from 'events'

export function createChannel() {
  const channel = new EventEmitter()

  function emit(data: Data) {
    console.log('I got: ', data)

    channel.emit('event', JSON.stringify(data))
  }

  function onEvent(cb: (data: Data) => void) {
    channel.on('event', (msg: string) => {
      console.log('I got: ', msg)

      const data = JSON.parse(msg.toString())
      cb(data)
    })
  }

  return {
    emit,
    onEvent,
  }
}
