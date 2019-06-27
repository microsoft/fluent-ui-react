import open from 'open'

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
    compiler.hooks.done.tap('Hello World Plugin', () => {
      if (!this.opened) {
        this.opened = true

        open(`http://${this.options.host}:${this.options.port}`).catch(() => {})
      }
    })
  }
}
