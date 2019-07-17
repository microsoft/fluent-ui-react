import * as DocsComponent from '@stardust-ui/docs-components'
import * as Stardust from '@stardust-ui/react'
import * as _ from 'lodash'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as ReactFela from 'react-fela'
import * as Classnames from 'classnames'

export const babelConfig = {
  plugins: [
    'proposal-class-properties',
    'proposal-object-rest-spread',
    ['transform-typescript', { isTSX: true }],
    'transform-classes',
  ],
  presets: ['es2015'],
}

export const imports = {
  '@stardust-ui/docs-components': DocsComponent,
  '@stardust-ui/react': Stardust,
  classnames: Classnames,
  lodash: _,
  react: React,
  'react-dom': ReactDOM,
  'react-fela': ReactFela,
}

export const importResolver = importName => imports[importName]
