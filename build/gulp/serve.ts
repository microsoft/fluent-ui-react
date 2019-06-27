import express from 'express'
import open from 'open'

import historyApiFallback from 'connect-history-api-fallback'
import { Server } from 'http'

type Express = ReturnType<typeof express>

const g = require('gulp-load-plugins')()

const { colors, log } = g.util

const serve = (
  directoryPath: string,
  host: string,
  port: number,
  configureMiddleware: (express: Express) => Express = app => app,
  openBrowser?: boolean,
): Promise<Server> => {
  return new Promise((resolve, reject) => {
    const server = configureMiddleware(
      express().use(
        historyApiFallback({
          verbose: false,
        }),
      ),
    )
      .use(express.static(directoryPath))
      .listen(port, host, err => {
        if (err) {
          reject(err)
        } else {
          const url = `http://${host}:${port}`

          log(colors.yellow(`Server running at ${url}`))
          if (openBrowser) open(url).catch(() => {})

          resolve(server)
        }
      })
  })
}

export const forceClose = (server: Server): Promise<void> => {
  if (!server) return Promise.resolve()

  return new Promise((resolve, reject) => {
    server.keepAliveTimeout = 1000
    server.close(err => (err ? reject(err) : resolve()))
  })
}

export default serve
