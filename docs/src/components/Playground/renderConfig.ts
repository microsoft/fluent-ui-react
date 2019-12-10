import * as CodeSandbox from '@fluentui/code-sandbox'
import * as DocsComponent from '@fluentui/docs-components'
import * as Stardust from '@fluentui/react'
import * as ReactFela from 'react-fela'
import * as ReactThemingAdapters from '@fluentui/react-theming-adapters'
import * as _ from 'lodash'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as Classnames from 'classnames'

const docsComponentsPackageJson = require('@fluentui/docs-components/package.json')
const stardustReactPackageJson = require('@fluentui/react/package.json')

export const babelConfig = {
  plugins: [
    'proposal-class-properties',
    'proposal-object-rest-spread',
    ['transform-typescript', { isTSX: true }],
    'transform-classes',
  ],
  presets: ['es2015'],
}

export const imports: Record<string, { version: string; module: any }> = {
  '@fluentui/code-sandbox': {
    version: 'latest',
    module: CodeSandbox,
  },
  '@fluentui/docs-components': {
    version: docsComponentsPackageJson.version,
    module: DocsComponent,
  },
  '@fluentui/react': {
    version: stardustReactPackageJson.version,
    module: Stardust,
  },
  '@fluentui/react-theming-adapters': {
    version: stardustReactPackageJson.dependencies['react-base-theme'],
    module: ReactThemingAdapters,
  },
  classnames: {
    version: stardustReactPackageJson.dependencies['classnames'],
    module: Classnames,
  },
  lodash: {
    version: stardustReactPackageJson.dependencies['lodash'],
    module: _,
  },
  react: {
    version: stardustReactPackageJson.peerDependencies['react'],
    module: React,
  },
  'react-dom': {
    version: stardustReactPackageJson.peerDependencies['react-dom'],
    module: ReactDOM,
  },
  'react-fela': {
    version: stardustReactPackageJson.dependencies['react-fela'],
    module: ReactFela,
  },
  prettier: {
    version: docsComponentsPackageJson.peerDependencies['prettier'],
    module: null, // no need to use it in our examples
  },
}

export const importResolver = importName => imports[importName].module
