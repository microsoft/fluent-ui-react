import { isEnabled as isDebugEnabled } from './debug/debugEnabled'

export let worker: Worker | null = null // eslint-disable-line import/no-mutable-exports

if (process.env.NODE_ENV !== 'production' && isDebugEnabled) {
  // if (true) {
  const workerBlob = new Blob(
    [`importScripts("https://unpkg.com/css-to-js-sourcemap-worker@2.0.5/worker.js")`],
    { type: 'application/javascript' },
  )

  worker = new Worker(URL.createObjectURL(workerBlob))

  worker.postMessage({
    id: 'init_wasm',
    url: 'https://unpkg.com/css-to-js-sourcemap-worker@2.0.5/mappings.wasm',
  })
  worker.postMessage({
    id: 'set_render_interval',
    interval: 120,
  })

  if (module.hot) {
    module.hot.addStatusHandler(status => {
      if (status === 'dispose') {
        worker.postMessage({ id: 'invalidate' })
      }
    })
  }
}

export const createDebugMetadata = (instance: Object, stackIndex) => {
  const { stack, stacktrace, message } = new Error('stacktrace source')

  instance.__debugMetadata = {
    stackInfo: { stack, stacktrace, message },
    stackIndex,
  }

  return instance
}
