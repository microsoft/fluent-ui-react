import * as _ from 'lodash'
import * as React from 'react'
import * as Stardust from '@stardust-ui/react'
import * as ReactDOM from 'react-dom'

import pkg from 'package.json'

export const babelConfig = {
  plugins: ['proposal-class-properties', ['transform-typescript', { isTSX: true }]],
  presets: [
    [
      'env',
      {
        targets: {
          browsers: ['last 4 versions', 'not dead'],
        },
      },
    ],
  ],
}

export const dependencies = {
  '@stardust-ui/react': {
    module: Stardust,
    version: pkg.version,
  },
  lodash: {
    module: _,
    version: pkg.dependencies.lodash,
  },
  react: {
    module: React,
    version: pkg.devDependencies.react,
  },
  'react-dom': {
    module: ReactDOM,
    version: pkg.devDependencies['react-dom'],
  },
}

const imports = _.mapValues(dependencies, 'module')

export const importResolver = importName => imports[importName]
