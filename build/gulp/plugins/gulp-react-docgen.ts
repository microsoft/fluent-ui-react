import * as gutil from 'gulp-util'
import * as path from 'path'
import * as through2 from 'through2'
import * as Vinyl from 'vinyl'

import { getComponentInfo, getBufferChecksum, getInfoChecksum } from './util'

const pluginName = 'gulp-react-docgen'

export default () =>
  through2.obj(function bufferContents(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file)
      return
    }

    if (file.isStream()) {
      cb(new gutil.PluginError(pluginName, 'Streaming is not supported'))
      return
    }

    const infoFilename = file.basename.replace(/\.tsx$/, '.info.json')
    const nextChecksum = getBufferChecksum(file.contents)

    if (getInfoChecksum(infoFilename) === nextChecksum) {
      cb(null)
      return
    }

    try {
      const contents = getComponentInfo(file.path, nextChecksum)
      const infoFile = new Vinyl({
        path: `./${infoFilename}`,
        contents: Buffer.from(JSON.stringify(contents, null, 2)),
      })

      cb(null, infoFile)
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
  })
