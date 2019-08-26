import * as DocsComponent from '@stardust-ui/docs-components'
import * as Stardust from '@stardust-ui/react'
import * as ReactFela from '@stardust-ui/react-fela'
import * as _ from 'lodash'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as Classnames from 'classnames'

const packageJson = require('../../../../package.json')
const docsComponentsPackageJson = require('@stardust-ui/docs-components/package.json')
const stardustReactPackageJson = require('@stardust-ui/react/package.json')

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
  '@stardust-ui/docs-components': {
    version: docsComponentsPackageJson.version,
    module: DocsComponent,
  },
  '@stardust-ui/react': {
    version: stardustReactPackageJson.version,
    module: Stardust,
  },
  classnames: {
    version: stardustReactPackageJson.dependencies['classnames'],
    module: Classnames,
  },
  lodash: {
    version: stardustReactPackageJson.devDependencies['@types/lodash'],
    module: _,
  },
  react: {
    version: packageJson.devDependencies['react'],
    module: React,
  },
  'react-dom': {
    version: packageJson.devDependencies['react-dom'],
    module: ReactDOM,
  },
  '@stardust-ui/react-fela': {
    version: stardustReactPackageJson.dependencies['@stardust-ui/react-fela'],
    module: ReactFela,
  },
}

export const importResolver = importName => imports[importName].module
