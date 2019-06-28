import openBrowser from 'react-dev-utils/openBrowser'

type OpenBrowserPluginOptions = {
  host: string
  port: number
}

export default class OpenBrowserPlugin {
  opened: boolean
  options: OpenBrowserPluginOptions

  constructor(options: OpenBrowserPluginOptions) {
    this.options = options
  }

  apply(compiler) {
    compiler.hooks.done.tap('Open Browser Plugin', () => {
      if (!this.opened) {
        this.opened = true

        openBrowser(`http://${this.options.host}:${this.options.port}`)
      }
    })
  }
}
