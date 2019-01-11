import * as Babel from '@babel/core'
import * as gutil from 'gulp-util'
import * as prettier from 'prettier'
import * as through from 'through2'
import * as Vinyl from 'vinyl'

import * as prettierConfig from '../../../.prettierrc.json'
import { ExampleSource } from '../../../docs/src/types'
import transformStarImportPlugin from '../../babel/transform-star-import-plugin'
import { getRelativePathToSourceFile } from './util'

const pluginName = 'gulp-example-source'

const createExampleSourceCode = (file: Vinyl): ExampleSource => {
  const tsSource = file.contents.toString()

  const transformResult = Babel.transform(tsSource, {
    plugins: [transformStarImportPlugin],
    presets: [['@babel/preset-typescript', { allExtensions: true, isTSX: true }]],
    sourceType: 'module',
  })
  const jsSource = prettier.format(transformResult.code, {
    ...prettierConfig,
    parser: 'babylon',
  })

  return {
    js: jsSource,
    ts: tsSource,
  }
}

export default () =>
  through.obj((file: Vinyl, enc, cb) => {
    if (file.isNull()) {
      cb(null, file)
      return
    }

    if (file.isStream()) {
      cb(new gutil.PluginError(pluginName, 'Streaming is not supported'))
      return
    }

    const sourcePath = getRelativePathToSourceFile(file.path)
    const source = createExampleSourceCode(file)

    const sourceFile = new Vinyl({
      path: sourcePath,
      contents: Buffer.from(JSON.stringify(source, null, 2)),
    })
    // `gulp-cache` relies on this private entry
    sourceFile._cachedKey = file._cachedKey

    cb(null, sourceFile)
  })
