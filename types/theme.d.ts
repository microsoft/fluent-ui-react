import * as CSSType from 'csstype'
import { IRenderer as IFelaRenderer } from 'fela'
import React from 'react'

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

  brand: string
  htmlFontSize: string
}

export type ComponentVariableValue = any

export type ComponentVariablesObject = ObjectOf<ComponentVariableValue>

export type ComponentVariablesFunction = (siteVariables: ISiteVariables) => ComponentVariablesObject

export type ComponentVariables = ComponentVariablesObject | ComponentVariablesFunction

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
}

export type ComponentPartStyle = ComponentStyleFunction | ICSSInJSStyle

export interface IComponentStyles {
  [part: string]: ComponentPartStyle

  root?: ComponentPartStyle
}

export interface IComponentStyleClasses {
  [part: string]: string

  root?: string
}

export interface ComponentStyleFunctionArg {
  props: IProps
  variables: ComponentVariablesObject
  siteVariables: ISiteVariables
  rtl: boolean
}

export type ComponentStyleFunction = (arg: ComponentStyleFunctionArg) => ICSSInJSStyle

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

export interface ITheme {
  siteVariables: ISiteVariables
  componentVariables: IThemeComponentVariables
  componentStyles: IThemeComponentStyles
  rtl: boolean
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
export interface IMergedThemes {
  siteVariables: ISiteVariables
  componentVariables: IThemeComponentVariables[]
  componentStyles: IThemeComponentStyles[]
  rtl: boolean
  renderer?: IRenderer
}

export interface IThemeComponentStyles {
  Accordion?: IComponentStyles
  Avatar?: IComponentStyles
  Button?: IComponentStyles
  Chat?: IComponentStyles
  Divider?: IComponentStyles
  Header?: IComponentStyles
  Icon?: IComponentStyles
  Image?: IComponentStyles
  Input?: IComponentStyles
  Label?: IComponentStyles
  Layout?: IComponentStyles
  List?: IComponentStyles
  Menu?: IComponentStyles
  Text?: IComponentStyles
}

export interface IThemeComponentVariables {
  Accordion?: ComponentVariables
  Avatar?: ComponentVariables
  Button?: ComponentVariables
  Chat?: ComponentVariables
  Divider?: ComponentVariables
  Header?: ComponentVariables
  Icon?: ComponentVariables
  Image?: ComponentVariables
  Input?: ComponentVariables
  Label?: ComponentVariables
  Layout?: ComponentVariables
  List?: ComponentVariables
  Menu?: ComponentVariables
  Text?: ComponentVariables
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
