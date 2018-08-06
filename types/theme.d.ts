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

type OneOrArray<T> = T | T[]
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

  ':first-child'?: ICSSInJSStyle
  ':last-child'?: ICSSInJSStyle
  ':nth-child(n+2)'?: ICSSInJSStyle
}

export interface ComponentStyleFunctionParam {
  props: IProps
  variables: ComponentVariablesObject
  siteVariables: ISiteVariables
  rtl: boolean
}

export type ComponentPartStyleFunction = (styleParam?: ComponentStyleFunctionParam) => ICSSInJSStyle

export type ComponentPartStyle = ComponentPartStyleFunction | ICSSInJSStyle

export interface IComponentPartStylesInput {
  [part: string]: ComponentPartStyle

  root?: ComponentPartStyle
}

export interface IComponentPartStylesPrepared {
  [part: string]: ComponentPartStyleFunction

  root?: ComponentPartStyleFunction
}

export interface IComponentPartClasses {
  [part: string]: string

  root?: string
}

// ========================================================
// Static Styles
// ========================================================

export type StaticStyleObject = {
  [selector: string]: ICSSInJSStyle
}

export type StaticStyleRenderable = string | StaticStyleObject

export type StaticStyleFunction = (siteVariables: ISiteVariables) => StaticStyleRenderable

export type StaticStyle = StaticStyleRenderable | StaticStyleFunction

export type StaticStyles = OneOrArray<StaticStyle>

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
  List?: ComponentVariablesInput
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
  List?: ComponentVariablesFunction
  Menu?: ComponentVariablesFunction
  Text?: ComponentVariablesFunction
}

export interface IRenderer extends IFelaRenderer {}

// ========================================================
// Fonts
// ========================================================

export interface IFontFaceStyle {
  fontStretch?: string
  fontStyle?: string
  fontVariant?: string
  fontWeight?: number
  localAlias?: string
  unicodeRange?: string
}

export interface IFontFace {
  name: string
  paths: string[]
  style: IFontFaceStyle
}

export type FontFaces = IFontFace[]
