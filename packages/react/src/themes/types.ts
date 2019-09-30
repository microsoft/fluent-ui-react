import * as CSSType from 'csstype'
import * as React from 'react'
import { Extendable, ObjectOf, ObjectOrFunc, Omit } from '../types'

// Themes go through 3 phases.
// 1. Input - (from the user), variable and style objects/functions, some values optional
// 2. Prepared - (on context), variable and style functions only, all values required
// 3. Resolved - (for rendering), plain object variables and styles, all values required
//
// We use these terms in typings to indicate which phase the typings apply to.

// ========================================================
// Variables
// ========================================================

export interface SiteVariablesInput extends ObjectOf<any> {}

export interface SiteVariablesPrepared extends SiteVariablesInput {
  fontSizes: ObjectOf<string>
}

export type ComponentVariablesObject = any

export type ComponentVariablesPrepared = (
  siteVariables?: SiteVariablesPrepared,
) => ComponentVariablesObject

// TODO: Make this generic
export type ComponentVariablesInput = ComponentVariablesObject | ComponentVariablesPrepared

// ========================================================
// Styles
// ========================================================

export interface ICSSPseudoElementStyle extends ICSSInJSStyle {
  content?: string
}

type AnimationKeyFrame = Record<'from' | 'to' | string, ICSSInJSStyle>

export interface StardustAnimationName<P = Record<string, any>> {
  keyframe?: AnimationKeyFrame | ((params: P) => AnimationKeyFrame)
  params?: P
}

export type CSSProperties = Omit<React.CSSProperties, 'animationName'> & {
  animationName?: StardustAnimationName | AnimationKeyFrame | string | 'none'
}

export interface ICSSInJSStyle extends CSSProperties {
  // TODO Questionable: how else would users target their own children?
  [key: string]: any

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
  TProps extends Record<string, any> = Record<string, any>,
  TVars extends ComponentVariablesObject = ComponentVariablesObject
> {
  displayName: string
  props: TProps
  variables: TVars
  theme: ThemePrepared
  rtl: boolean
  disableAnimations: boolean
}

// Heads Up!
// Keep in sync with packages/react-proptypes/src/index.ts
export type ComponentDesign = {
  display?: ICSSInJSStyle['display']
  position?: ICSSInJSStyle['position']

  top?: ICSSInJSStyle['top']
  bottom?: ICSSInJSStyle['bottom']
  left?: ICSSInJSStyle['left']
  right?: ICSSInJSStyle['right']

  padding?: ICSSInJSStyle['padding']
  paddingTop?: ICSSInJSStyle['paddingTop']
  paddingRight?: ICSSInJSStyle['paddingRight']
  paddingBottom?: ICSSInJSStyle['paddingBottom']
  paddingLeft?: ICSSInJSStyle['paddingLeft']

  margin?: ICSSInJSStyle['margin']
  marginTop?: ICSSInJSStyle['marginTop']
  marginRight?: ICSSInJSStyle['marginRight']
  marginBottom?: ICSSInJSStyle['marginBottom']
  marginLeft?: ICSSInJSStyle['marginLeft']

  width?: ICSSInJSStyle['width']
  height?: ICSSInJSStyle['height']
  minWidth?: ICSSInJSStyle['minWidth']
  maxWidth?: ICSSInJSStyle['maxWidth']
  minHeight?: ICSSInJSStyle['minHeight']
  maxHeight?: ICSSInJSStyle['maxHeight']
}

export type ComponentSlotStyleFunction<TProps = {}, TVars = {}> = (
  styleParam?: ComponentStyleFunctionParam<TProps, TVars>,
) => ICSSInJSStyle

export type ComponentSlotStyle<TProps = {}, TVars = {}> =
  | ComponentSlotStyleFunction<TProps, TVars>
  | ICSSInJSStyle

export interface ComponentSlotStylesInput<TProps = {}, TVars = {}>
  extends ObjectOf<ComponentSlotStyle<TProps, TVars>> {}

export interface ComponentSlotStylesPrepared<TProps = {}, TVars = {}>
  extends ObjectOf<ComponentSlotStyleFunction<TProps, TVars>> {}

export interface ComponentSlotClasses extends ObjectOf<string> {}

export type AnimationProp =
  | {
      name: string
      delay?: string
      direction?: string
      duration?: string
      fillMode?: string
      iterationCount?: string
      playState?: string
      timingFunction?: string
      keyframeParams?: object
    }
  | string
// ========================================================
// Static Styles
// ========================================================

export type StaticStyleObject = ObjectOf<ICSSInJSStyle>

export type StaticStyleRenderable = string | StaticStyleObject

export type StaticStyleFunction = (siteVariables?: SiteVariablesPrepared) => StaticStyleObject

export type StaticStyle = StaticStyleRenderable | StaticStyleFunction

export type StaticStyles = StaticStyle[]

export interface ThemeAnimation<KP = {}> {
  keyframe: ((kp: KP) => object) | object | string
  delay?: string
  direction?: string
  duration?: string
  fillMode?: string
  iterationCount?: string
  playState?: string
  timingFunction?: string
  keyframeParams?: KP
}

// ========================================================
// Theme
// ========================================================
export interface ThemeInput {
  siteVariables?: SiteVariablesInput
  componentVariables?: ThemeComponentVariablesInput
  componentStyles?: ThemeComponentStylesInput
  fontFaces?: FontFaces
  staticStyles?: StaticStyles
  icons?: ThemeIcons
  animations?: { [key: string]: ThemeAnimation }
}

// Component variables and styles must be resolved by the component after
// all cascading is complete, not by any Provider in the middle of the tree.
// This ensures the final site variables are used in the component's variables
// and styles. Resolving component variables/styles in the Provider would mean
// the latest site variables might not be applied to the component.
//
// As a theme cascades down the tree and is merged with the previous theme on
// context, the resulting theme takes this shape.
export interface ThemePrepared {
  siteVariables: SiteVariablesPrepared
  componentVariables: { [key in keyof ThemeComponentVariablesPrepared]: ComponentVariablesPrepared }
  componentStyles: { [key in keyof ThemeComponentStylesPrepared]: ComponentSlotStylesPrepared }
  icons: ThemeIcons
  fontFaces: FontFaces
  staticStyles: StaticStyles
  animations: { [key: string]: ThemeAnimation }
}

export type ThemeComponentVariablesInput = Record<string, ComponentVariablesInput>

export type ThemeComponentVariablesPrepared = Record<string, ComponentVariablesPrepared>

export type ThemeComponentStylesInput = Record<string, ComponentSlotStylesInput | undefined>

export type ThemeComponentStylesPrepared = Record<string, ComponentSlotStylesPrepared | undefined>

// ========================================================
// Fonts
// ========================================================

export interface FontFaceProps {
  fontStretch?: string
  fontStyle?: string
  fontVariant?: string
  fontWeight?: number
  localAlias?: string | string[]
  unicodeRange?: string
}

export interface FontFace {
  name: string
  paths: string[]
  props: FontFaceProps
}

export type FontFaces = FontFace[]

// ========================================================
// Icons
// ========================================================

type SvgIconFuncArg = {
  classes: { [iconSlot: string]: string }
  rtl: boolean
  props: any
}

export type SvgIconSpec = ObjectOrFunc<React.ReactNode, SvgIconFuncArg>
export type FontIconSpec = {
  content: string
  fontFamily: string
}

export type ThemeIconSpec = {
  isSvg?: boolean
  icon: FontIconSpec | SvgIconSpec
}

export type RequiredIconNames =
  | 'stardust-checkmark'
  | 'stardust-circle'
  | 'stardust-close'
  | 'stardust-arrow-end'
  | 'stardust-arrow-up'
  | 'stardust-arrow-down'
  | 'stardust-pause'
  | 'stardust-play'

export type ThemeIcons = Partial<Record<RequiredIconNames, ThemeIconSpec>> & {
  [iconName: string]: ThemeIconSpec
}
