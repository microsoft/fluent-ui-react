import * as CSSType from 'csstype'
import { IRenderer as FelaRenderer } from 'fela'
import * as React from 'react'
import { Extendable, ObjectOf, ObjectOrFunc, KnownKeys } from '../types'
import { AccordionProps } from '../../src/components/Accordion/Accordion'
import { AlertProps } from '../../src/components/Alert/Alert'
import { AnimationProps } from '../../src/components/Animation/Animation'
import { AttachmentProps } from '../../src/components/Attachment/Attachment'
import { AvatarProps } from '../../src/components/Avatar/Avatar'
import { ButtonProps } from '../../src/components/Button/Button'
import { ButtonGroupProps } from '../../src/components/Button/ButtonGroup'
import { ChatProps } from '../../src/components/Chat/Chat'
import { ChatItemProps } from '../../src/components/Chat/ChatItem'
import { ChatMessageProps } from '../../src/components/Chat/ChatMessage'
import { DividerProps } from '../../src/components/Divider/Divider'
import { DropdownProps } from '../../src/components/Dropdown/Dropdown'
import { DropdownItemProps } from '../../src/components/Dropdown/DropdownItem'
import { DropdownSearchInputProps } from '../../src/components/Dropdown/DropdownSearchInput'
import { EmbedProps } from '../../src/components/Embed/Embed'
import { FormProps } from '../../src/components/Form/Form'
import { FormFieldProps } from '../../src/components/Form/FormField'
import { GridProps } from '../../src/components/Grid/Grid'
import { HeaderProps } from '../../src/components/Header/Header'
import { HeaderDescriptionProps } from '../../src/components/Header/HeaderDescription'
import { IconProps } from '../../src/components/Icon/Icon'
import { ImageProps } from '../../src/components/Image/Image'
import { InputProps } from '../../src/components/Input/Input'
import { ItemLayoutProps } from '../../src/components/ItemLayout/ItemLayout'
import { LabelProps } from '../../src/components/Label/Label'
import { LayoutProps } from '../../src/components/Layout/Layout'
import { ListProps } from '../../src/components/List/List'
import { ListItemProps } from '../../src/components/List/ListItem'
import { MenuProps } from '../../src/components/Menu/Menu'
import { MenuItemProps } from '../../src/components/Menu/MenuItem'
import { PortalProps } from '../../src/components/Portal/Portal'
import { PopupProps } from '../../src/components/Popup/Popup'
import { PopupContentProps } from '../../src/components/Popup/PopupContent'
import { RadioGroupProps } from '../../src/components/RadioGroup/RadioGroup'
import { RadioGroupItemProps } from '../../src/components/RadioGroup/RadioGroupItem'
import { ReactionProps } from '../../src/components/Reaction/Reaction'
import { ReactionGroupProps } from '../../src/components/Reaction/ReactionGroup'
import { SegmentProps } from '../../src/components/Segment/Segment'
import { StatusProps } from '../../src/components/Status/Status'
import { TextProps } from '../../src/components/Text/Text'
import { TreeProps } from '../../src/components/Tree/Tree'
import { TreeItemProps } from '../../src/components/Tree/TreeItem'
import { TreeTitleProps } from '../../src/components/Tree/TreeTitle'
import { VideoProps } from '../../src/components/Video/Video'

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
// Reusable styles
// ========================================================

type PerSlotFunc<TResult, TProps = {}> = Record<string, (props?: TProps) => TResult>

export type StyledGenericApi<TResult> = {
  [K in KnownKeys<ThemeComponentStylesPrepared>]?: PerSlotFunc<
    TResult,
    ThemeComponentStylesPrepared[K] extends ComponentSlotStylesPrepared<infer TProps> ? TProps : {}
  >
}

export type StylesApi = StyledGenericApi<ICSSInJSStyle>
export type ClassesApi = StyledGenericApi<string>

export type ApplyStyledConfig = {
  siteVariables: any
  styles: StylesApi
  classes: ClassesApi
}

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
  TVars extends ComponentVariablesObject = ComponentVariablesObject,
  TStyles = StylesApi
> {
  props: State & TProps
  variables: TVars
  theme: ThemePrepared
  colors: Partial<ColorScheme>
  styles: TStyles
}

export type ComponentSlotStyleFunction<TProps = {}, TVars = {}, TStyles = StylesApi> = ((
  styleParam: ComponentStyleFunctionParam<TProps, TVars, TStyles>,
) => ICSSInJSStyle)

export type ComponentSlotStyle<TProps = {}, TVars = {}, TStyles = StylesApi> =
  | ComponentSlotStyleFunction<TProps, TVars, TStyles>
  | ICSSInJSStyle

export interface ComponentSlotStylesInput<TProps = {}, TVars = {}, TStyles = StylesApi>
  extends ObjectOf<ComponentSlotStyle<TProps, TVars, TStyles>> {}

export interface ComponentSlotStylesPrepared<TProps = {}, TVars = {}>
  extends ObjectOf<ComponentSlotStyleFunction<TProps, TVars>> {}

export type ComponentSelectorsAndStyles<TProps = {}, TVars = {}> = (
  arg: TVars,
) => { [key in keyof TProps]: [Partial<TProps>, ICSSInJSStyle][] }

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
  componentVariants?: any
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
  componentVariants?: any
  icons: ThemeIcons
  rtl: boolean
  renderer: Renderer
  fontFaces: FontFaces
  staticStyles: StaticStyles
  animations: { [key: string]: ThemeAnimation }
}

type ThemeStylesProps = {
  Accordion: AccordionProps
  Alert: AlertProps
  Animation: AnimationProps
  Attachment: AttachmentProps
  Avatar: AvatarProps
  Button?: ButtonProps
  ButtonGroup?: ButtonGroupProps
  Chat?: ChatProps
  ChatItem?: ChatItemProps
  ChatMessage?: ChatMessageProps
  Divider?: DividerProps
  Dropdown?: DropdownProps
  DropdownItem?: DropdownItemProps
  DropdownSearchInput?: DropdownSearchInputProps
  Embed?: EmbedProps
  Form?: FormProps
  FormField?: FormFieldProps
  Grid?: GridProps
  Header?: HeaderProps
  HeaderDescription?: HeaderDescriptionProps
  Icon?: IconProps
  Image?: ImageProps
  Input?: InputProps
  ItemLayout?: ItemLayoutProps
  Label?: LabelProps
  Layout?: LayoutProps
  List?: ListProps
  ListItem?: ListItemProps
  Menu?: MenuProps
  MenuItem?: MenuItemProps
  Portal?: PortalProps
  Popup?: PopupProps
  PopupContent?: PopupContentProps
  RadioGroup?: RadioGroupProps
  RadioGroupItem?: RadioGroupItemProps
  Reaction?: ReactionProps
  ReactionGroup?: ReactionGroupProps
  Segment?: SegmentProps
  Status?: StatusProps
  Text?: TextProps
  Tree?: TreeProps
  TreeItem?: TreeItemProps
  TreeTitle?: TreeTitleProps
  Video?: VideoProps
}

export type ThemeComponentVariablesInput = {
  [K in keyof ThemeStylesProps]?: ComponentVariablesInput
} &
  Record<string, any>

export type ThemeComponentVariablesPrepared = {
  [K in keyof ThemeStylesProps]?: ComponentVariablesPrepared
} &
  Record<string, any>

export type ThemeComponentStylesInput = {
  [K in keyof ThemeStylesProps]?: ComponentSlotStylesInput<ThemeStylesProps[K]>
} & { [key: string]: ComponentSlotStylesInput | undefined }

export type ThemeComponentStylesPrepared = {
  [K in keyof ThemeStylesProps]?: ComponentSlotStylesPrepared<ThemeStylesProps[K]>
} & { [key: string]: ComponentSlotStylesPrepared | undefined }

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
