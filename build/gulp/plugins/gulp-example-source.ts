import * as Babel from '@babel/core'
import * as gutil from 'gulp-util'
import * as path from 'path'
import * as prettier from 'prettier'
import * as through from 'through2'
import * as Vinyl from 'vinyl'

import * as prettierConfig from '../../../.prettierrc.json'
import { ExampleSource } from '../../../docs/src/types'
import transformStarImport from '../../babel/transform-star-import'

const pluginName = 'gulp-example-source'

const createExample = (file: Vinyl): ExampleSource => {
  const tsSource = file.contents.toString()

  const transformResult = Babel.transform(tsSource, {
    plugins: [transformStarImport],
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

    // create a base name: accordion.types.accordion.example.shorthand
    const basename = file.path
      .split(path.sep)
      .slice(-3)
      .join('.')
      .replace(/\.tsx$/, '')
      .toLowerCase()
    const source = createExample(file)

    cb(
      null,
      new Vinyl({
        path: `./${basename}.source.json`,
        contents: Buffer.from(JSON.stringify(source, null, 2)),
      }),
    )
  })
