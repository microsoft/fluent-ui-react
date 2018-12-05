export type ExampleSource = {
  js: string
  ts: string
}

export type BehaviorInfo = {
  name: string
  displayName: string
  category: string
}

export type ComponentInfo = {
  behaviors?: BehaviorInfo[]
  constructorName: string
  componentClassName: string
  implementsCreateShorthand: boolean
  mappedShorthandProp?: string
  displayName: string
  filename: string
  filenameWithoutExt: string
  docblock: {
    description: string
    tags: { description: string; title: string }[]
  }
  apiPath: string
  isChild: boolean
  isParent: boolean
  parentDisplayName: null | string
  props: ComponentProp[]
  repoPath: string
  subcomponentName: null | string
  subcomponents: string[]
  type: 'component'
}

export type ComponentProp = {
  defaultValue: any
  description: string
  name: string
  tags: {
    title: string
    description: string
    type: null
    name: string
  }[]
  types: ComponentPropType[]
  required: boolean
}

export type ComponentPropType = {
  name?: string
  keyword?: boolean
  parameters?: ComponentPropType[]
  value?: string
}
