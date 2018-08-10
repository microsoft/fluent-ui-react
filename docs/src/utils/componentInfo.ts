import { ComponentType } from 'react'

export interface IComponentInfoObjectTag {
  name: string
  title: 'accessibility' | 'example' | 'param' | 'returns' | 'see'
  description: string
  type: {
    type: string
    name: string
  }
}

export interface IComponentInfoObjectProp {
  type: 'bool' | 'component' | 'custom' | 'func' | 'node' | 'string' | 'enum'
  name: string
  description: string[]
  defaultValue: string
  value?: any[] // that is, allowed enum values
  tags: IComponentInfoObjectTag[]
  required: boolean
}

export interface IComponentInfoObject {
  displayName: string
  props: IComponentInfoObjectProp[]
  constructorName: string
  type: string
  isParent: boolean
  isChild: boolean
  parentDisplayName: string | null
  subcomponentName: string | null
  subcomponents: string[]
  apiPath: string
  componentClassName: string
  docblock: {
    tags: IComponentInfoObjectTag[]
    description: string[]
  }
  repoPath: string
  filename: string
  filenameWithoutExt: string
}

interface IComponentInfo extends RequireContextReturn {
  byDisplayName: { [key: string]: IComponentInfoObject }
  fromComponent: (Component: ComponentType) => IComponentInfoObject
  parents: IComponentInfoObject[]
  all: IComponentInfoObject[]
}

/**
 * Get the Webpack Context for all Component.info.json files.
 */
const ctx = require.context('../../../docs/src/componentInfo', true, /\.info\.json$/)
const keys: string[] = ctx.keys()

const componentInfo = {} as IComponentInfo
componentInfo.all = keys.map(ctx)

componentInfo.byDisplayName = componentInfo.all.reduce((acc, next) => {
  acc[next.displayName] = next
  return acc
}, {})

componentInfo.fromComponent = Component => {
  const displayName = Component.displayName || Component.name

  return componentInfo.byDisplayName[displayName]
}

componentInfo.parents = componentInfo.all.filter(info => info.isParent)

export default componentInfo
