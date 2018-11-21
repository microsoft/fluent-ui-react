import * as gutil from 'gulp-util'
import * as path from 'path'
import * as through2 from 'through2'
import * as Vinyl from 'vinyl'

import getComponentInfo from './util/getComponentInfo'

const pluginName = 'gulp-component-menu'

type ComponentMenuItem = {
  displayName: string
  type: string
}

export default () => {
  const result: ComponentMenuItem[] = []

  function bufferContents(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file)
      return
    }

    if (file.isStream()) {
      cb(new gutil.PluginError(pluginName, 'Streaming is not supported'))
      return
    }

    try {
      const info = getComponentInfo(file.path)

      if (info.isParent) {
        result.push({
          displayName: info.displayName,
          type: info.type,
        })
      }
      cb()
    } catch (err) {
      const pluginError = new gutil.PluginError(pluginName, err)
      const relativePath = path.relative(process.cwd(), file.path)
      pluginError.message = [
        gutil.colors.magenta(`Error in file: ${relativePath}`),
        gutil.colors.red(err.message),
        gutil.colors.gray(err.stack),
      ].join('\n\n')
      this.emit('error', pluginError)
    }
  }

  function endStream(cb) {
    const file = new Vinyl({
      path: './componentMenu.json',
      contents: Buffer.from(JSON.stringify(result, null, 2)),
    })

    this.push(file)
    cb()
  }

  return through2.obj(bufferContents, endStream)
}
