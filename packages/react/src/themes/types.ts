import * as CSSType from 'csstype'
import { IRenderer as FelaRenderer } from 'fela'
import * as React from 'react'
import { Extendable, ObjectOf, ObjectOrFunc } from '../types'

// Themes go through 3 phases.
// 1. Input - (from the user), variable and style objects/functions, some values optional
// 2. Prepared - (on context), variable and style functions only, all values required
// 3. Resolved - (for rendering), plain object variables and styles, all values required
//
// We use these terms in typings to indicate which phase the typings apply to.

// ========================================================
// Colors
// ========================================================

/**
 * A type for a palette for a single color.
 */
export type ColorVariants = {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
}

/**
 * A type for a predefined natural colors.
 */
type NaturalColorsStrict = Partial<{
  blue: ColorVariants
  green: ColorVariants
  grey: ColorVariants
  orange: ColorVariants
  pink: ColorVariants
  purple: ColorVariants
  teal: ColorVariants
  red: ColorVariants
  yellow: ColorVariants
}>

export type NaturalColors = Extendable<NaturalColorsStrict, ColorVariants>

/**
 * A type for a predefined state colors.
 */
export type ContextualColorsStrict = Partial<{
  text: ColorVariants

  danger: ColorVariants
  info: ColorVariants
  success: ColorVariants
  warning: ColorVariants
}>

export type ContextualColors = Extendable<ContextualColorsStrict, ColorVariants>

/**
 * A type for a predefined emphasis colors.
 */
type EmphasisColorsStrict = Partial<{
  primary: ColorVariants
  secondary: ColorVariants
}>

export type EmphasisColors = Extendable<EmphasisColorsStrict, ColorVariants>

/**
 * A type for extracting the color names.
 */
export type ColorNames = keyof (EmphasisColorsStrict & NaturalColorsStrict)

/**
 * A type for an extendable set of ColorNames properties of type T
 */
export type ColorValues<T> = Extendable<Partial<Record<ColorNames, T>>, T>

/**
 * A type for a base colors.
 */
export type PrimitiveColors = Partial<{
  black: string
  white: string
}>

type ExtendablePalette<T> = T &
  { [K in keyof T]?: K extends keyof PrimitiveColors ? string : ColorVariants }

export type ColorPalette = ExtendablePalette<
  EmphasisColorsStrict & ContextualColorsStrict & NaturalColorsStrict & PrimitiveColors
>

/**
 * A type for the generic color scheme of a component based on CSS property names
 */
export type ColorScheme = {
  foreground: string
  background: string
  border: string
  shadow: string
}

export type ColorSchemeMapping = ColorValues<ColorScheme> & { default?: ColorScheme }

// ========================================================
// Props
// ========================================================

export type PropsWithVarsAndStyles = Extendable<{
  variables?: ComponentVariablesInput
  styles?: ComponentSlotStyle
}>

// ========================================================
// State
// ========================================================

export type State = ObjectOf<any>

// ========================================================
// Variables
// ========================================================

export interface SiteVariablesInput extends ObjectOf<any> {
  colors?: ColorPalette
  colorScheme?: ColorSchemeMapping
  contextualColors?: ContextualColors
  emphasisColors?: EmphasisColors
  naturalColors?: NaturalColorsStrict
}

export interface SiteVariablesPrepared extends SiteVariablesInput {
  fontSizes: ObjectOf<string>
}

export type ComponentVariablesObject = any

export type ComponentVariablesPrepared = (
  siteVariables?: SiteVariablesPrepared,
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
  TProps extends PropsWithVarsAndStyles = PropsWithVarsAndStyles,
  TVars extends ComponentVariablesObject = ComponentVariablesObject
> {
  props: State & TProps
  variables: TVars
  theme: ThemePrepared
  colors: Partial<ColorScheme>
}

export type ComponentSlotStyleFunction<TProps = {}, TVars = {}> = ((
  styleParam?: ComponentStyleFunctionParam<TProps, TVars>,
) => ICSSInJSStyle)

export type ComponentSlotStyle<TProps = {}, TVars = {}> =
  | ComponentSlotStyleFunction<TProps, TVars>
  | ICSSInJSStyle

export interface ComponentSlotStylesInput<TProps = {}, TVars = {}>
  extends ObjectOf<ComponentSlotStyle<TProps, TVars>> {}

export interface ComponentSlotStylesPrepared<TProps = {}, TVars = {}>
  extends ObjectOf<ComponentSlotStyleFunction<TProps, TVars>> {}

export interface ComponentSlotClasses extends ObjectOf<string> {}
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
  rtl?: boolean
  renderer?: Renderer
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
  rtl: boolean
  renderer: Renderer
  fontFaces: FontFaces
  staticStyles: StaticStyles
  animations: { [key: string]: ThemeAnimation }
}

export interface ThemeComponentStylesInput {
  [key: string]: ComponentSlotStylesInput | undefined

  Accordion?: ComponentSlotStylesInput
  Alert?: ComponentSlotStylesInput
  Animation?: ComponentSlotStylesInput
  Attachment?: ComponentSlotStylesInput
  Avatar?: ComponentSlotStylesInput
  Button?: ComponentSlotStylesInput
  ButtonGroup?: ComponentSlotStylesInput
  Chat?: ComponentSlotStylesInput
  ChatItem?: ComponentSlotStylesInput
  ChatMessage?: ComponentSlotStylesInput
  Divider?: ComponentSlotStylesInput
  Dropdown?: ComponentSlotStylesInput
  DropdownItem?: ComponentSlotStylesInput
  DropdownSearchInput?: ComponentSlotStylesInput
  Embed?: ComponentSlotStylesInput
  Form?: ComponentSlotStylesInput
  FormField?: ComponentSlotStylesInput
  Grid?: ComponentSlotStylesInput
  Header?: ComponentSlotStylesInput
  HeaderDescription?: ComponentSlotStylesInput
  Icon?: ComponentSlotStylesInput
  Image?: ComponentSlotStylesInput
  Input?: ComponentSlotStylesInput
  ItemLayout?: ComponentSlotStylesInput
  Label?: ComponentSlotStylesInput
  Layout?: ComponentSlotStylesInput
  List?: ComponentSlotStylesInput
  ListItem?: ComponentSlotStylesInput
  Menu?: ComponentSlotStylesInput
  MenuItem?: ComponentSlotStylesInput
  Portal?: ComponentSlotStylesInput
  Popup?: ComponentSlotStylesInput
  PopupContent?: ComponentSlotStylesInput
  RadioGroup?: ComponentSlotStylesInput
  RadioGroupItem?: ComponentSlotStylesInput
  Reaction?: ComponentSlotStylesInput
  ReactionGroup?: ComponentSlotStylesInput
  Segment?: ComponentSlotStylesInput
  Status?: ComponentSlotStylesInput
  Text?: ComponentSlotStylesInput
  Tree?: ComponentSlotStylesInput
  TreeItem?: ComponentSlotStylesInput
  TreeTitle?: ComponentSlotStylesInput
  Video?: ComponentSlotStylesInput
}

export interface ThemeComponentStylesPrepared {
  [key: string]: ComponentSlotStylesPrepared | undefined

  Accordion?: ComponentSlotStylesPrepared
  Alert?: ComponentSlotStylesPrepared
  Animation?: ComponentSlotStylesPrepared
  Attachment?: ComponentSlotStylesPrepared
  Avatar?: ComponentSlotStylesPrepared
  Button?: ComponentSlotStylesPrepared
  ButtonGroup?: ComponentSlotStylesPrepared
  Chat?: ComponentSlotStylesPrepared
  ChatItem?: ComponentSlotStylesPrepared
  ChatMessage?: ComponentSlotStylesPrepared
  Divider?: ComponentSlotStylesPrepared
  Dropdown?: ComponentSlotStylesPrepared
  DropdownItem?: ComponentSlotStylesPrepared
  DropdownSearchInput?: ComponentSlotStylesPrepared
  Embed?: ComponentSlotStylesPrepared
  Form?: ComponentSlotStylesPrepared
  FormField?: ComponentSlotStylesPrepared
  Grid?: ComponentSlotStylesPrepared
  Header?: ComponentSlotStylesPrepared
  HeaderDescription?: ComponentSlotStylesPrepared
  Icon?: ComponentSlotStylesPrepared
  Image?: ComponentSlotStylesPrepared
  Input?: ComponentSlotStylesPrepared
  ItemLayout?: ComponentSlotStylesPrepared
  Label?: ComponentSlotStylesPrepared
  Layout?: ComponentSlotStylesPrepared
  List?: ComponentSlotStylesPrepared
  ListItem?: ComponentSlotStylesPrepared
  Menu?: ComponentSlotStylesPrepared
  MenuItem?: ComponentSlotStylesPrepared
  Portal?: ComponentSlotStylesPrepared
  Popup?: ComponentSlotStylesPrepared
  PopupContent?: ComponentSlotStylesPrepared
  RadioGroup?: ComponentSlotStylesPrepared
  RadioGroupItem?: ComponentSlotStylesPrepared
  Reaction?: ComponentSlotStylesPrepared
  ReactionGroup?: ComponentSlotStylesPrepared
  Segment?: ComponentSlotStylesPrepared
  Status?: ComponentSlotStylesPrepared
  Text?: ComponentSlotStylesPrepared
  Tree?: ComponentSlotStylesPrepared
  TreeItem?: ComponentSlotStylesPrepared
  TreeTitle?: ComponentSlotStylesPrepared
  Video?: ComponentSlotStylesPrepared
}

export interface ThemeComponentVariablesInput {
  [key: string]: any

  Accordion?: ComponentVariablesInput
  Alert?: ComponentVariablesInput
  Animation?: ComponentVariablesInput
  Attachment?: ComponentVariablesInput
  Avatar?: ComponentVariablesInput
  Button?: ComponentVariablesInput
  ButtonGroup?: ComponentVariablesInput
  Chat?: ComponentVariablesInput
  ChatItem?: ComponentVariablesInput
  ChatMessage?: ComponentVariablesInput
  Divider?: ComponentVariablesInput
  Dropdown?: ComponentVariablesInput
  Embed?: ComponentVariablesInput
  Form?: ComponentVariablesInput
  FormField?: ComponentVariablesInput
  Grid?: ComponentVariablesInput
  Header?: ComponentVariablesInput
  HeaderDescription?: ComponentVariablesInput
  Icon?: ComponentVariablesInput
  Image?: ComponentVariablesInput
  Input?: ComponentVariablesInput
  ItemLayout?: ComponentVariablesInput
  Label?: ComponentVariablesInput
  Layout?: ComponentVariablesInput
  List?: ComponentVariablesInput
  ListItem?: ComponentVariablesInput
  Menu?: ComponentVariablesInput
  MenuItem?: ComponentVariablesInput
  Portal?: ComponentVariablesInput
  Popup?: ComponentVariablesInput
  PopupContent?: ComponentVariablesInput
  RadioGroup?: ComponentVariablesInput
  RadioGroupItem?: ComponentVariablesInput
  Reaction?: ComponentVariablesInput
  ReactionGroup?: ComponentVariablesInput
  Segment?: ComponentVariablesInput
  Status?: ComponentVariablesInput
  Text?: ComponentVariablesInput
  Tree?: ComponentVariablesInput
  TreeItem?: ComponentVariablesInput
  TreeTitle?: ComponentVariablesInput
  Video?: ComponentVariablesInput
}

export interface ThemeComponentVariablesPrepared {
  [key: string]: any

  Accordion?: ComponentVariablesPrepared
  Alert?: ComponentVariablesPrepared
  Animation?: ComponentVariablesPrepared
  Attachment?: ComponentVariablesPrepared
  Avatar?: ComponentVariablesPrepared
  Button?: ComponentVariablesPrepared
  ButtonGroup?: ComponentVariablesPrepared
  Chat?: ComponentVariablesPrepared
  ChatItem?: ComponentVariablesPrepared
  ChatMessage?: ComponentVariablesPrepared
  Divider?: ComponentVariablesPrepared
  Dropdown?: ComponentVariablesPrepared
  Embed?: ComponentVariablesPrepared
  Form?: ComponentVariablesPrepared
  FormField?: ComponentVariablesPrepared
  Grid?: ComponentVariablesPrepared
  Header?: ComponentVariablesPrepared
  HeaderDescription?: ComponentVariablesPrepared
  Icon?: ComponentVariablesPrepared
  Image?: ComponentVariablesPrepared
  Input?: ComponentVariablesPrepared
  ItemLayout?: ComponentVariablesPrepared
  Label?: ComponentVariablesPrepared
  Layout?: ComponentVariablesPrepared
  List?: ComponentVariablesPrepared
  ListItem?: ComponentVariablesPrepared
  Menu?: ComponentVariablesPrepared
  MenuItem?: ComponentVariablesPrepared
  Portal?: ComponentVariablesPrepared
  Popup?: ComponentVariablesPrepared
  PopupContent?: ComponentVariablesPrepared
  RadioGroup?: ComponentVariablesPrepared
  RadioGroupItem?: ComponentVariablesPrepared
  Reaction?: ComponentVariablesPrepared
  ReactionGroup?: ComponentVariablesPrepared
  Segment?: ComponentVariablesPrepared
  Status?: ComponentVariablesPrepared
  Text?: ComponentVariablesPrepared
  Tree?: ComponentVariablesPrepared
  TreeItem?: ComponentVariablesPrepared
  TreeTitle?: ComponentVariablesPrepared
  Video?: ComponentVariablesPrepared
}

export interface Renderer extends FelaRenderer {}

// ========================================================
// Fonts
// ========================================================

export interface FontFaceStyle {
  fontStretch?: string
  fontStyle?: string
  fontVariant?: string
  fontWeight?: number
  localAlias?: string
  unicodeRange?: string
}

export interface FontFace {
  name: string
  paths: string[]
  style: FontFaceStyle
}

export type FontFaces = FontFace[]

// ========================================================
// Icons
// ========================================================

type SvgIconFuncArg = {
  classes: { [iconSlot: string]: string }
  rtl: boolean
}

export type SvgIconSpec = ObjectOrFunc<React.ReactNode, SvgIconFuncArg>
export type FontIconSpec = ObjectOrFunc<{
  content: string
  fontFamily: string
}>

export type ThemeIconSpec = {
  isSvg?: boolean
  icon: FontIconSpec | SvgIconSpec
}

export type RequiredIconNames =
  | 'stardust-close'
  | 'stardust-arrow-end'
  | 'stardust-arrow-up'
  | 'stardust-arrow-down'
  | 'stardust-pause'
  | 'stardust-play'

export type ThemeIcons = Partial<Record<RequiredIconNames, ThemeIconSpec>> & {
  [iconName: string]: ThemeIconSpec
}
