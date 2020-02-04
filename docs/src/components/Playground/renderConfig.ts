import * as Accessibility from '@fluentui/accessibility'
import * as CodeSandbox from '@fluentui/code-sandbox'
import * as DocsComponent from '@fluentui/docs-components'
import * as FluentUI from '@fluentui/react'
import * as ReactFela from 'react-fela'
import * as _ from 'lodash'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as Classnames from 'classnames'

const accessibilityPackageJson = require('@fluentui/accessibility/package.json')
const docsComponentsPackageJson = require('@fluentui/docs-components/package.json')
const projectPackageJson = require('@fluentui/react/package.json')

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
  '@fluentui/accessibility': {
    version: accessibilityPackageJson.version,
    module: Accessibility,
  },

  '@fluentui/code-sandbox': {
    version: 'latest',
    module: CodeSandbox,
  },
  '@fluentui/docs-components': {
    version: docsComponentsPackageJson.version,
    module: DocsComponent,
  },
  '@fluentui/react': {
    version: projectPackageJson.version,
    module: FluentUI,
  },
  classnames: {
    version: projectPackageJson.dependencies['classnames'],
    module: Classnames,
  },
  lodash: {
    version: projectPackageJson.dependencies['lodash'],
    module: _,
  },
  react: {
    version: projectPackageJson.peerDependencies['react'],
    module: React,
  },
  'react-dom': {
    version: projectPackageJson.peerDependencies['react-dom'],
    module: ReactDOM,
  },
  'react-fela': {
    version: projectPackageJson.dependencies['react-fela'],
    module: ReactFela,
  },
  prettier: {
    version: docsComponentsPackageJson.peerDependencies['prettier'],
    module: null, // no need to use it in our examples
  },
}

export const importResolver = importName => {
  if (imports[importName]) {
    return imports[importName].module
  }
  throw new Error(`Module '${importName}' was not found. Please check renderConfig.ts`)
}
