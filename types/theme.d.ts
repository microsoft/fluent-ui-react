import * as CSSType from 'csstype'
import { IRenderer as IFelaRenderer } from 'fela'
import * as React from 'react'

// Themes go through 3 phases.
// 1. Input - (from the user), variable and style objects/functions, some values optional
// 2. Prepared - (on context), variable and style functions only, all values required
// 3. Resolved - (for rendering), plain object variables and styles, all values required
//
// We use these terms in typings to indicate which phase the typings apply to.

// ========================================================
// Utilities
// ========================================================

type ObjectOf<T> = { [key: string]: T }

// ========================================================
// Props
// ========================================================

export type IProps = ObjectOf<any>

// ========================================================
// Variables
// ========================================================

export interface ISiteVariables {
  [key: string]: any

  brand?: string
  htmlFontSize?: string
}

export type ComponentVariableValue = string | number | boolean

export type ComponentVariablesObject = ObjectOf<ComponentVariableValue>

export type ComponentVariablesFunction = (
  siteVariables?: ISiteVariables,
) => ComponentVariablesObject

export type ComponentVariablesInput = ComponentVariablesObject | ComponentVariablesFunction

// ========================================================
// Styles
// ========================================================

export interface ICSSPseudoElementStyle extends ICSSInJSStyle {
  content?: string
}

export interface ICSSInJSStyle extends React.CSSProperties {
  // missing React.CSSProperties
  speak?: CSSType.Globals | 'none' | 'normal' | 'spell-out'

  // CSS in JS Properties
  '::before'?: ICSSPseudoElementStyle
  '::after'?: ICSSPseudoElementStyle

  ':hover'?: ICSSInJSStyle
  ':active'?: ICSSInJSStyle
  ':focus'?: ICSSInJSStyle
  ':visited'?: ICSSInJSStyle
}

export interface ComponentStyleFunctionParam {
  props: IProps
  variables: ComponentVariablesObject
  rtl: boolean
}

export type ComponentPartStyleFunction =
  | ((styleParam?: ComponentStyleFunctionParam) => ICSSInJSStyle)
  | undefined

export type ComponentPartStyle = ComponentPartStyleFunction | ICSSInJSStyle | undefined

export interface IComponentPartStylesInput {
  [part: string]: ComponentPartStyle

  root?: ComponentPartStyle
}

export interface IComponentPartStylesPrepared {
  [part: string]: ComponentPartStyleFunction

  root?: ComponentPartStyleFunction
}

// ========================================================
// Theme
// ========================================================
export interface IThemeInput {
  siteVariables?: ISiteVariables
  componentVariables?: IThemeComponentVariablesInput
  componentStyles?: IThemeComponentStylesInput
  rtl?: boolean
  renderer?: IRenderer
}

// Component variables and styles must be resolved by the component after
// all cascading is complete, not by any Provider in the middle of the tree.
// This ensures the final site variables are used in the component's variables
// and styles. Resolving component variables/styles in the Provider would mean
// the latest site variables might not be applied to the component.
//
// As a theme cascades down the tree and is merged with the previous theme on
// context, the resulting theme takes this shape.
export interface IThemePrepared {
  siteVariables: ISiteVariables
  componentVariables: {
    [key in keyof IThemeComponentVariablesPrepared]: ComponentVariablesFunction
  }
  componentStyles: { [key in keyof IThemeComponentStylesPrepared]: IComponentPartStylesPrepared }
  rtl: boolean
  renderer: IRenderer
}

export interface IThemeComponentStylesInput {
  Accordion?: IComponentPartStylesInput
  Avatar?: IComponentPartStylesInput
  Button?: IComponentPartStylesInput
  Chat?: IComponentPartStylesInput
  Divider?: IComponentPartStylesInput
  Header?: IComponentPartStylesInput
  Icon?: IComponentPartStylesInput
  Image?: IComponentPartStylesInput
  Input?: IComponentPartStylesInput
  Label?: IComponentPartStylesInput
  Layout?: IComponentPartStylesInput
  List?: IComponentPartStylesInput
  ListItem?: IComponentPartStylesInput
  Menu?: IComponentPartStylesInput
  Text?: IComponentPartStylesInput
}

export interface IThemeComponentStylesPrepared {
  Accordion?: IComponentPartStylesPrepared
  Avatar?: IComponentPartStylesPrepared
  Button?: IComponentPartStylesPrepared
  Chat?: IComponentPartStylesPrepared
  Divider?: IComponentPartStylesPrepared
  Header?: IComponentPartStylesPrepared
  Icon?: IComponentPartStylesPrepared
  Image?: IComponentPartStylesPrepared
  Input?: IComponentPartStylesPrepared
  Label?: IComponentPartStylesPrepared
  Layout?: IComponentPartStylesPrepared
  List?: IComponentPartStylesPrepared
  ListItem?: IComponentPartStylesPrepared
  Menu?: IComponentPartStylesPrepared
  Text?: IComponentPartStylesPrepared
}

export interface IThemeComponentVariablesInput {
  Accordion?: ComponentVariablesInput
  Avatar?: ComponentVariablesInput
  Button?: ComponentVariablesInput
  Chat?: ComponentVariablesInput
  Divider?: ComponentVariablesInput
  Header?: ComponentVariablesInput
  Icon?: ComponentVariablesInput
  Image?: ComponentVariablesInput
  Input?: ComponentVariablesInput
  Label?: ComponentVariablesInput
  Layout?: ComponentVariablesInput
  ListItem?: ComponentVariablesInput
  Menu?: ComponentVariablesInput
  Text?: ComponentVariablesInput
}

export interface IThemeComponentVariablesPrepared {
  Accordion?: ComponentVariablesFunction
  Avatar?: ComponentVariablesFunction
  Button?: ComponentVariablesFunction
  Chat?: ComponentVariablesFunction
  Divider?: ComponentVariablesFunction
  Header?: ComponentVariablesFunction
  Icon?: ComponentVariablesFunction
  Image?: ComponentVariablesFunction
  Input?: ComponentVariablesFunction
  Label?: ComponentVariablesFunction
  Layout?: ComponentVariablesFunction
  ListItem?: ComponentVariablesFunction
  Menu?: ComponentVariablesFunction
  Text?: ComponentVariablesFunction
}

export interface IRenderer extends IFelaRenderer {}
