import {
  SiteVariablesInput,
  SiteVariablesPrepared,
  ComponentVariablesInput,
  ComponentVariablesPrepared,
  ComponentSlotStylesInput,
  ComponentSlotStyle,
  ComponentSlotStylesPrepared,
  ThemeInput,
} from '../../themes/types'

export type DebugDataProviderArgs = {
  componentName: string
  themes: (ThemeInput | undefined)[]
  instanceStylesOverrides: ComponentSlotStyle
  instanceVariablesOverrides: ComponentVariablesInput
  resolveStyles: (componentStyles: ComponentSlotStylesInput) => ComponentSlotStylesPrepared
  resolveVariables: (componentVariables: ComponentVariablesInput) => ComponentVariablesPrepared
}

export type DebugCategory<Result = any, Input = any, InstanceInput = Input> = {
  instanceOverrides: DebugEntry<Result, InstanceInput>
  themes: DebugEntry<Result, Input>[]
  result: Result
}

export type DebugEntry<Result, Input> = {
  src: Input
  args: any
  resolved: Result
  merged: Result
}

export type SiteVariablesDebugData = DebugCategory<SiteVariablesPrepared, SiteVariablesInput>
export type VariablesDebugData = DebugCategory<ComponentVariablesPrepared, ComponentVariablesInput>
export type StylesDebugData = DebugCategory<
  ComponentSlotStylesPrepared,
  ComponentSlotStylesInput,
  ComponentSlotStyle
>

export interface IDebugData {
  componentName: string
  siteVariables: SiteVariablesDebugData
  variables: VariablesDebugData
  styles: StylesDebugData
}
