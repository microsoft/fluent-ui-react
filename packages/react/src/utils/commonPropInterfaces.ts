import { ComponentSlotStyle, ComponentVariablesInput } from '@fluentui/styles'
import * as React from 'react'

import { AnimationProp, ComponentDesign } from '../themes/types'
import { ReactChildren } from '../types'

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
  /** Additional CSS class name(s) to apply.  */
  className?: string
  design?: ComponentDesign
}

export type SizeValue = 'smallest' | 'smaller' | 'small' | 'medium' | 'large' | 'larger' | 'largest'

export type AlignValue = 'start' | 'end' | 'center' | 'justify'

export interface ColorComponentProps<TColor = string> {
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
