import { createServer, Options } from 'http-server'
import { ListenOptions } from 'net'

export function httpServerTask(options: Options & ListenOptions = {}) {
  return function httpServer(done: () => void) {
    const server = createServer(options)
    server.listen({ host: 'localhost', port: options.port }, () => {
      /* eslint-disable-next-line no-console */
      console.log(`running on http://localhost:${options.port}/`)
      done()
    })
  }
}
