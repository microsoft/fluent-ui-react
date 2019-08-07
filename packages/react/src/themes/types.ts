import * as CSSType from 'csstype'
import { IRenderer as FelaRenderer } from '@stardust-ui/fela'
import * as React from 'react'
import { Extendable, ObjectOf, ObjectOrFunc, Omit } from '../types'
import { AccordionContentProps } from '../components/Accordion/AccordionContent'
import { AccordionProps } from '../components/Accordion/Accordion'
import { AccordionTitleProps } from '../components/Accordion/AccordionTitle'
import { AlertProps } from '../components/Alert/Alert'
import { AnimationProps } from '../components/Animation/Animation'
import { AttachmentProps } from '../components/Attachment/Attachment'
import { AvatarProps } from '../components/Avatar/Avatar'
import { ButtonGroupProps } from '../components/Button/ButtonGroup'
import { ButtonProps } from '../components/Button/Button'
import { ChatItemProps } from '../components/Chat/ChatItem'
import { ChatMessageProps } from '../components/Chat/ChatMessage'
import { ChatProps } from '../components/Chat/Chat'
import { CheckboxProps } from '../components/Checkbox/Checkbox'
import { DividerProps } from '../components/Divider/Divider'
import { DropdownProps } from '../components/Dropdown/Dropdown'
import { EmbedProps } from '../components/Embed/Embed'
import { FlexItemProps } from '../components/Flex/FlexItem'
import { FlexProps } from '../components/Flex/Flex'
import { FormFieldProps } from '../components/Form/FormField'
import { FormProps } from '../components/Form/Form'
import { GridProps } from '../components/Grid/Grid'
import { HeaderDescriptionProps } from '../components/Header/HeaderDescription'
import { HeaderProps } from '../components/Header/Header'
import { IconProps } from '../components/Icon/Icon'
import { ImageProps } from '../components/Image/Image'
import { InputProps } from '../components/Input/Input'
import { ItemLayoutProps } from '../components/ItemLayout/ItemLayout'
import { LabelProps } from '../components/Label/Label'
import { LayoutProps } from '../components/Layout/Layout'
import { ListItemProps } from '../components/List/ListItem'
import { ListProps } from '../components/List/List'
import { LoaderProps } from '../components/Loader/Loader'
import { MenuItemProps } from '../components/Menu/MenuItem'
import { MenuProps } from '../components/Menu/Menu'
import { PopupContentProps } from '../components/Popup/PopupContent'
import { PopupProps } from '../components/Popup/Popup'
import { PortalProps } from '../components/Portal/Portal'
import { RadioGroupItemProps } from '../components/RadioGroup/RadioGroupItem'
import { RadioGroupProps } from '../components/RadioGroup/RadioGroup'
import { ReactionGroupProps } from '../components/Reaction/ReactionGroup'
import { ReactionProps } from '../components/Reaction/Reaction'
import { SegmentProps } from '../components/Segment/Segment'
import { SliderProps } from '../components/Slider/Slider'
import { StatusProps } from '../components/Status/Status'
import { TextProps } from '../components/Text/Text'
import { ToolbarDividerProps } from '../components/Toolbar/ToolbarDivider'
import { ToolbarItemProps } from '../components/Toolbar/ToolbarItem'
import { ToolbarProps } from '../components/Toolbar/Toolbar'
import { ToolbarRadioGroupProps } from '../components/Toolbar/ToolbarRadioGroup'
import { TooltipContentProps } from '../components/Tooltip/TooltipContent'
import { TooltipProps } from '../components/Tooltip/Tooltip'
import { TreeItemProps } from '../components/Tree/TreeItem'
import { TreeProps } from '../components/Tree/Tree'
import { TreeTitleProps } from '../components/Tree/TreeTitle'
import { VideoProps } from '../components/Video/Video'

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
export type ColorVariants = Extendable<
  Partial<{
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
  }>,
  string
>
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

  brand: ColorVariants
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
export type ColorValues<T, Colors extends string | number | symbol = ColorNames> = Extendable<
  Partial<Record<Colors, T>>,
  T
>

/**
 * A type for a base colors.
 */
export type PrimitiveColors = Partial<{
  black: string
  white: string
}>

type ExtendablePalette<T> = T &
  { [K in keyof T]?: K extends keyof PrimitiveColors ? string : ColorVariants }

export type ColorPalette<T = {}> = ExtendablePalette<
  EmphasisColorsStrict & ContextualColorsStrict & NaturalColorsStrict & PrimitiveColors & T
>

/**
 * A type for all area names that can define color
 */
export type ComponentAreaName =
  | 'foreground'
  | 'background'
  | 'border'
  | 'shadow'
  | 'foregroundHover'
  | 'backgroundHover'
  | 'borderHover'
  | 'shadowHover'
  | 'foregroundActive'
  | 'backgroundActive'
  | 'borderActive'
  | 'shadowActive'
  | 'foregroundFocus'
  | 'backgroundFocus'
  | 'borderFocus'
  | 'shadowFocus'
  | 'foregroundPressed'
  | 'backgroundPressed'
  | 'borderPressed'
  | 'shadowPressed'
  | 'foregroundDisabled'
  | 'backgroundDisabled'
  | 'borderDisabled'
  | 'shadowDisabled'

/**
 * A type for the generic color scheme of a component based on CSS property names
 */
export type ColorScheme<T extends string | number | symbol = ComponentAreaName> = Extendable<
  Record<T, string>,
  string
>

export type ColorSchemeMapping<
  Scheme = ColorScheme,
  Colors extends string | number | symbol = ColorNames
> = ColorValues<Extendable<Scheme, string>, Colors> & {
  default?: Extendable<Scheme, string>
}

export type StrictColorScheme<T extends string | number | symbol = ComponentAreaName> = Record<
  T,
  string
>

export type StrictColorSchemeMapping<
  Scheme = StrictColorScheme,
  Colors extends string | number | symbol = ColorNames
> = ColorValues<Scheme, Colors> & {
  default?: Scheme
}

export type ColorSchemeMappingOverrides<
  Scheme = ColorScheme,
  Colors extends string | number | symbol = ColorNames
> = ColorValues<Partial<Extendable<Scheme, string>>, Colors> & {
  default?: Partial<Extendable<ColorScheme, string>>
}

export type ItemType<T> = T extends (infer TItem)[] ? TItem : never

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

export interface SiteVariablesInput extends ObjectOf<any> {}

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
  TProps extends PropsWithVarsAndStyles = PropsWithVarsAndStyles,
  TVars extends ComponentVariablesObject = ComponentVariablesObject
> {
  displayName: string
  props: State & TProps
  variables: TVars
  theme: ThemePrepared
  rtl: boolean
  disableAnimations: boolean
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

type ThemeStylesProps = {
  Accordion?: AccordionProps
  AccordionTitle?: AccordionTitleProps
  AccordionContent?: AccordionContentProps
  Alert?: AlertProps
  Animation?: AnimationProps
  Attachment?: AttachmentProps
  Avatar?: AvatarProps
  Button?: ButtonProps
  ButtonGroup?: ButtonGroupProps
  Chat?: ChatProps
  ChatItem?: ChatItemProps
  ChatMessage?: ChatMessageProps
  Checkbox?: CheckboxProps
  Divider?: DividerProps
  Dropdown?: DropdownProps
  Embed?: EmbedProps
  Flex?: FlexProps
  FlexItem?: FlexItemProps
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
  Loader?: LoaderProps
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
  Slider?: SliderProps
  Status?: StatusProps
  Toolbar?: ToolbarProps
  ToolbarItem?: ToolbarItemProps
  ToolbarDivider?: ToolbarDividerProps
  ToolbarRadioGroup?: ToolbarRadioGroupProps
  Tooltip?: TooltipProps
  TooltipContent?: TooltipContentProps
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
} &
  Record<string, ComponentSlotStylesInput | undefined>

export type ThemeComponentStylesPrepared = {
  [K in keyof ThemeStylesProps]?: ComponentSlotStylesPrepared<ThemeStylesProps[K]>
} &
  Record<string, ComponentSlotStylesPrepared | undefined>

export interface Renderer extends FelaRenderer {}

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
  props: IconProps
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
