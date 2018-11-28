import * as _ from 'lodash'
import * as React from 'react'
import * as Stardust from '@stardust-ui/react'

export const babelConfig = {
  plugins: [['transform-typescript', { isTSX: true }]],
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

const imports = {
  '@stardust-ui/react': Stardust,
  lodash: _,
  react: React,
}

export const importResolver = importName => imports[importName]
