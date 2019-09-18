import { mergeSiteVariables, mergeComponentVariables, mergeComponentStyles } from '../mergeThemes'
import DebugData from './debugData'
import { getLastOf } from './utils'

import {
  ThemeInput,
  ComponentSlotStylesPrepared,
  ComponentSlotStylesInput,
  ComponentVariablesInput,
  ComponentVariablesPrepared,
  SiteVariablesPrepared,
  SiteVariablesInput,
} from '../../themes/types'
import { DebugDataProviderArgs, DebugCategory } from './types'

type CreateDebugCategoryArgs<ResolvedData, InputData> = {
  getDataFromTheme: (theme: ThemeInput) => InputData
  args: any
  resolve: (input: InputData) => ResolvedData
  merge: (...inputs: ResolvedData[]) => InputData
  defaultValue: InputData
  instanceOverrides?: InputData
}

export default class Debug {
  private readonly componentName: DebugDataProviderArgs['componentName']
  private readonly themes: DebugDataProviderArgs['themes']

  private readonly instanceStylesOverrides: DebugDataProviderArgs['instanceStylesOverrides']
  private readonly instanceVariablesOverrides: DebugDataProviderArgs['instanceVariablesOverrides']

  private readonly resolveStyles: DebugDataProviderArgs['resolveStyles']
  private readonly resolveVariables: DebugDataProviderArgs['resolveVariables']

  constructor({
    componentName,
    themes,
    instanceStylesOverrides,
    instanceVariablesOverrides,
    resolveStyles,
    resolveVariables,
  }: DebugDataProviderArgs) {
    this.componentName = componentName
    this.themes = themes
    this.instanceStylesOverrides = instanceStylesOverrides
    this.instanceVariablesOverrides = instanceVariablesOverrides
    this.resolveStyles = resolveStyles
    this.resolveVariables = resolveVariables
  }

  public resolve() {
    const siteVariablesDebugData = this.createDebugCategory<
      SiteVariablesPrepared,
      SiteVariablesInput
    >({
      getDataFromTheme: theme => theme && theme.siteVariables,
      args: {},
      resolve: it => it as any,
      merge: mergeSiteVariables,
      defaultValue: {},
    })

    const variablesDebugData = this.createDebugCategory<
      ComponentVariablesPrepared,
      ComponentVariablesInput
    >({
      getDataFromTheme: theme =>
        theme.componentVariables && theme.componentVariables[this.componentName],
      args: { siteVariables: siteVariablesDebugData.result },
      resolve: this.resolveVariables,
      merge: mergeComponentVariables,
      defaultValue: {},
      instanceOverrides: this.instanceVariablesOverrides,
    })

    const stylesDebugData = this.createDebugCategory<
      ComponentSlotStylesPrepared,
      ComponentSlotStylesInput
    >({
      getDataFromTheme: theme =>
        theme && theme.componentStyles && theme.componentStyles[this.componentName],
      args: { siteVariables: siteVariablesDebugData.result, variables: variablesDebugData.result },
      resolve: this.resolveStyles,
      merge: mergeComponentStyles,
      defaultValue: {},
      instanceOverrides: this.instanceStylesOverrides
        ? { root: this.instanceStylesOverrides }
        : undefined,
    })

    return new DebugData(
      this.componentName,
      siteVariablesDebugData,
      variablesDebugData,
      stylesDebugData,
    )
  }

  private createDebugCategory<ResolvedData, InputData>({
    getDataFromTheme,
    args,
    resolve,
    merge,
    defaultValue,
    instanceOverrides,
  }: CreateDebugCategoryArgs<ResolvedData, InputData>): DebugCategory<ResolvedData, InputData> {
    const themeSources = this.themes.map(theme => getDataFromTheme(theme) || defaultValue)
    const themeResolved = themeSources.map(resolve)
    const themeMerged = this.cumulativeMergeAndResolve<InputData, ResolvedData>(
      themeResolved,
      merge,
      resolve,
    )
    const themeResult = getLastOf(themeMerged, resolve(defaultValue))

    const instance = instanceOverrides
      ? {
          src: instanceOverrides,
          args,
          resolved: resolve(instanceOverrides),
          merged: merge(themeResult, resolve(instanceOverrides)),
        }
      : ({} as any)

    const result = instance.src
      ? resolve(merge(themeResult, resolve(instanceOverrides)))
      : themeResult

    return {
      result,
      themes: themeSources.map((src, index) => ({
        src,
        args,
        resolved: themeResolved[index],
        merged: themeMerged[index],
      })),
      instanceOverrides: instance,
    }
  }

  private cumulativeMergeAndResolve<InputData, ResolvedData>(
    resolved: ResolvedData[],
    merge: (...args: ResolvedData[]) => InputData,
    resolve: (input: InputData) => ResolvedData,
  ): ResolvedData[] {
    return resolved.map((item, index) => {
      const merged = merge(...resolved.slice(0, index + 1))
      return resolve(merged)
    })
  }
}
