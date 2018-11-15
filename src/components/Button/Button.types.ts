import {
  ComponentEventHandler,
  ShorthandRenderFunction,
  ShorthandValue,
} from '../../../types/utils'

import { Accessibility } from '../../lib/accessibility/types'

import {
  UIComponentProps,
  ContentComponentProps,
  ChildrenComponentProps,
} from '../../lib/commonPropInterfaces'

import isFromKeyboard from '../../lib/isFromKeyboard'

export interface ButtonProps
  extends UIComponentProps<any, any>,
    ContentComponentProps,
    ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default buttonBehavior
   */
  accessibility?: Accessibility

  /** A button can appear circular. */
  circular?: boolean

  /** A button can show it is currently unable to be interacted with. */
  disabled?: boolean

  /** A button can take the width of its container. */
  fluid?: boolean

  /** Button can have an icon. */
  icon?: ShorthandValue

  /** A button may indicate that it has only icon. */
  iconOnly?: boolean

  /** An icon button can format an Icon to appear before or after the button */
  iconPosition?: 'before' | 'after'

  /**
   * Called after user's click.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: ComponentEventHandler<ButtonProps>

  /**
   * Called after user's focus.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onFocus?: ComponentEventHandler<ButtonProps>

  /** A button can be formatted to show different levels of emphasis. */
  primary?: boolean

  /**
   * A custom render function the icon slot.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderIcon?: ShorthandRenderFunction

  /** A button can be formatted to show only text in order to indicate some less-pronounced actions. */
  text?: boolean

  /** A button can be formatted to show different levels of emphasis. */
  secondary?: boolean
}

export interface ButtonState {
  [isFromKeyboard.propertyName]: boolean
}
