import { Data } from './types.ts'
import EventEmitter from 'events'

export function createChannel() {
  const channel = new EventEmitter()

  function emit(data: Data) {
    console.log('emit: I got: ', data)

    channel.emit('event', JSON.stringify(data))
  }

  function onEvent(cb: (data: Data) => void) {
    console.log('onEvent working')
    channel.on('event', (msg: string) => {
      console.log('channel.on: I got: ', msg)

      const data = JSON.parse(msg.toString())
      cb(data)
    })
  }

  return {
    emit,
    onEvent,
  }
}
