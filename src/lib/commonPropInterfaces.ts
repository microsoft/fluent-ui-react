import { ComponentVariablesInput, ComponentSlotStyle } from '../themes/types'
import { ShorthandValue, ReactChildren } from '../../types/utils'

export interface StyledComponentProps<P, V> {
  /** Additional CSS styles to apply to the component instance.  */
  styles?: ComponentSlotStyle<P, V>

  /** Override for theme site variables to allow modifications of component styling via themes. */
  variables?: ComponentVariablesInput
}

export interface UIComponentProps<P, V> extends StyledComponentProps<P, V> {
  /** An element type to render as (string or function). */
  as?: any

  /** Additional CSS class name(s) to apply.  */
  className?: string
}

export interface ContentComponentProps {
  /** Shorthand for primary content. */
  content?: ShorthandValue
}

export interface ChildrenComponentProps {
  /**
   *  Button content for childrenApi
   *  @docSiteIgnore
   */
  children?: ReactChildren
}
