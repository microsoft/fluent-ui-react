import * as CSSType from 'csstype'
import { IRenderer as IFelaRenderer } from 'fela'
import * as React from 'react'
import { Extendable, ObjectOf, OneOrArray, ObjectOrFunc } from './utils'

// Themes go through 3 phases.
// 1. Input - (from the user), variable and style objects/functions, some values optional
// 2. Prepared - (on context), variable and style functions only, all values required
// 3. Resolved - (for rendering), plain object variables and styles, all values required
//
// We use these terms in typings to indicate which phase the typings apply to.

// ========================================================
// Props
// ========================================================

export type IProps = ObjectOf<any>

export type IPropsWithVarsAndStyles = Extendable<{
  variables?: ComponentVariablesInput
  styles?: ComponentPartStyle
}>

// ========================================================
// State
// ========================================================

export type IState = ObjectOf<any>

// ========================================================
// Variables
// ========================================================

export interface ISiteVariablesInput extends ObjectOf<any> {
  brand?: string
  htmlFontSize?: string
}

export interface ISiteVariablesPrepared extends ObjectOf<any> {
  brand?: string
  htmlFontSize?: string
  fontSizes: ObjectOf<string>
}

export type ComponentVariablesObject = any

export type ComponentVariablesPrepared = (
  siteVariables?: ISiteVariablesPrepared,
  props?: any,
) => ComponentVariablesObject

export type ComponentVariablesInput = ComponentVariablesObject | ComponentVariablesPrepared

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

  // TODO Questionable: avoid order specific styles
  ':first-child'?: ICSSInJSStyle
  ':last-child'?: ICSSInJSStyle
  ':nth-child(n+2)'?: ICSSInJSStyle

  // TODO Questionable: unsupported by autoprefixer, one-off vendors
  // we could expand these ourselves so that "font-smoothing" works, but which values?
  '-webkit-font-smoothing'?:
    | CSSType.Globals
    | 'auto'
    | 'none'
    | 'antialiased'
    | 'subpixel-antialiased'
  '-moz-osx-font-smoothing'?: CSSType.Globals | 'auto' | 'grayscale'
}

export interface ComponentStyleFunctionParam<
  TProps extends IPropsWithVarsAndStyles = IPropsWithVarsAndStyles,
  TVars extends ComponentVariablesObject = ComponentVariablesObject
> {
  props: IState & TProps
  variables: TVars
  theme: IThemePrepared
}

export type ComponentPartStyleFunction<TProps = {}, TVars = {}> = ((
  styleParam?: ComponentStyleFunctionParam<TProps, TVars>,
) => ICSSInJSStyle)

export type ComponentPartStyle<TProps = {}, TVars = {}> =
  | ComponentPartStyleFunction<TProps, TVars>
  | ICSSInJSStyle

export interface IComponentPartStylesInput<TProps = {}, TVars = {}>
  extends ObjectOf<ComponentPartStyle<TProps, TVars>> {}

export interface IComponentPartStylesPrepared<TProps = {}, TVars = {}>
  extends ObjectOf<ComponentPartStyleFunction<TProps, TVars>> {}

export interface IComponentPartClasses extends ObjectOf<string> {}

// ========================================================
// Static Styles
// ========================================================

export type StaticStyleObject = ObjectOf<ICSSInJSStyle>

export type StaticStyleRenderable = string | StaticStyleObject

export type StaticStyleFunction = (siteVariables?: ISiteVariablesPrepared) => StaticStyleObject

export type StaticStyle = StaticStyleRenderable | StaticStyleFunction

export type StaticStyles = StaticStyle[]

// ========================================================
// Theme
// ========================================================
export interface IThemeInput {
  siteVariables?: ISiteVariablesInput
  componentVariables?: IThemeComponentVariablesInput
  componentStyles?: IThemeComponentStylesInput
  rtl?: boolean
  renderer?: IRenderer
  fontFaces?: FontFaces
  staticStyles?: StaticStyles
  icons?: ThemeIcons
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
  siteVariables: ISiteVariablesPrepared
  componentVariables: {
    [key in keyof IThemeComponentVariablesPrepared]: ComponentVariablesPrepared
  }
  componentStyles: { [key in keyof IThemeComponentStylesPrepared]: IComponentPartStylesPrepared }
  icons: ThemeIcons
  rtl: boolean
  renderer: IRenderer
  fontFaces: FontFaces
  staticStyles: StaticStyles
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
  Accordion?: ComponentVariablesPrepared
  Avatar?: ComponentVariablesPrepared
  Button?: ComponentVariablesPrepared
  Chat?: ComponentVariablesPrepared
  Divider?: ComponentVariablesPrepared
  Header?: ComponentVariablesPrepared
  Icon?: ComponentVariablesPrepared
  Image?: ComponentVariablesPrepared
  Input?: ComponentVariablesPrepared
  Label?: ComponentVariablesPrepared
  Layout?: ComponentVariablesPrepared
  ListItem?: ComponentVariablesPrepared
  Menu?: ComponentVariablesPrepared
  Text?: ComponentVariablesPrepared
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

// ========================================================
// Icons
// ========================================================

type Classes = { [iconPart: string]: string }
type SvgIconFuncArg = {
  classes: Classes
}

type SvgIconSpec = ObjectOrFunc<React.ReactNode, SvgIconFuncArg>
export type FontIconSpec = ObjectOrFunc<{
  content: string
  fontFamily: string
}>

export type ThemeIconSpec = {
  isSvg?: boolean
  icon: FontIconSpec | SvgIconSpec
}

export type ThemeIcons = { [iconName: string]: ThemeIconSpec }
