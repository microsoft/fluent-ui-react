import * as React from 'react'
import { ComponentVariablesInput, ComponentSlotStyle, AnimationProp } from '../themes/types'
import { ReactChildren } from '../../types/utils'

export interface StyledComponentProps<P = any, V = any> {
  /** Additional CSS styles to apply to the component instance.  */
  styles?: ComponentSlotStyle<P, V>

  /** Override for theme site variables to allow modifications of component styling via themes. */
  variables?: ComponentVariablesInput
}

export interface AnimatedComponentProps {
  /** Generic animation property that can be used for applying different theme animations. */
  animation?: AnimationProp
}

export interface UIComponentProps<P = any, V = any>
  extends StyledComponentProps<P, V>,
    AnimatedComponentProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Additional CSS class name(s) to apply.  */
  className?: string
}

export type ColorValue =
  | 'primary'
  | 'secondary'
  | 'blue'
  | 'green'
  | 'grey'
  | 'orange'
  | 'pink'
  | 'purple'
  | 'teal'
  | 'red'
  | 'yellow'
  | string

export type ComplexColorPropType =
  | {
      foreground?: ColorValue
      background?: ColorValue
      border?: ColorValue
      shadow?: ColorValue
    }
  | ColorValue

export interface ColorComponentProps<TColor = ColorValue> {
  /** A component can have a color. */
  color?: TColor
}

export interface ContentComponentProps<TContent = React.ReactNode> {
  /** Shorthand for primary content. */
  content?: TContent
}

export interface ChildrenComponentProps<TChildren = ReactChildren> {
  /**
   *  Content for childrenApi
   *  @docSiteIgnore
   */
  children?: TChildren
}
