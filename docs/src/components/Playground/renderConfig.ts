import * as _ from 'lodash'
import * as React from 'react'
import * as Stardust from '@stardust-ui/react'
import * as ReactDOM from 'react-dom'

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

export const imports = {
  '@stardust-ui/react': Stardust,
  lodash: _,
  react: React,
  'react-dom': ReactDOM,
}

export const importResolver = importName => imports[importName]
