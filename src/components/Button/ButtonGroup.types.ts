import {
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
} from '../../lib/commonPropInterfaces'
import { ShorthandRenderFunction, ShorthandValue } from '../../../types/utils'
import { Accessibility } from '../../lib/accessibility/types'

export interface ButtonGroupProps
  extends UIComponentProps<any, any>,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default buttonGroupBehavior
   */
  accessibility?: Accessibility

  /** The buttons contained inside the ButtonGroup. */
  buttons?: ShorthandValue[]

  /** The buttons inside group can appear circular. */
  circular?: boolean

  /**
   * A custom render iterator for rendering each of the Button.Group buttons.
   * The default component, props, and children are available for each button.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderButton?: ShorthandRenderFunction
}
