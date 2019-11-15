import { Accessibility, buttonBehavior } from '@stardust-ui/accessibility'
import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import {
  UIComponent,
  childrenExist,
  createShorthandFactory,
  UIComponentProps,
  ContentComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
  applyAccessibilityKeyHandlers,
  SizeValue,
  ShorthandFactory,
} from '../../lib'
import Icon, { IconProps } from '../Icon/Icon'
import Box, { BoxProps } from '../Box/Box'
import Loader, { LoaderProps } from '../Loader/Loader'
import { ComponentEventHandler, WithAsProp, ShorthandValue, withSafeTypeForAs } from '../../types'
import ButtonGroup from './ButtonGroup'

export interface ButtonProps
  extends UIComponentProps,
    ContentComponentProps<ShorthandValue<BoxProps>>,
    ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility

  /** A button can appear circular. */
  circular?: boolean

  /** A button can show that it cannot be interacted with. */
  disabled?: boolean

  /** A button can fill the width of its container. */
  fluid?: boolean

  /** A button can have an icon. */
  icon?: ShorthandValue<IconProps>

  /** A button can contain only an icon. */
  iconOnly?: boolean

  /** An icon button can format its Icon to appear before or after its content */
  iconPosition?: 'before' | 'after'

  /** Shorthand to customize a button's loader. */
  loader?: ShorthandValue<LoaderProps>

  /** A button can show a loading indicator. */
  loading?: boolean

  /**
   * Called after a user clicks the button.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: ComponentEventHandler<ButtonProps>

  /**
   * Called after a user focuses the button.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onFocus?: ComponentEventHandler<ButtonProps>

  /** A button can emphasize that it represents the primary action. */
  primary?: boolean

  /** A button can be formatted to show only text in order to indicate a less-pronounced action. */
  text?: boolean

  /** A button can emphasize that it represents an alternative action. */
  secondary?: boolean

  /** A button can be sized. */
  size?: SizeValue
}

class Button extends UIComponent<WithAsProp<ButtonProps>> {
  static create: ShorthandFactory<ButtonProps>

  static displayName = 'Button'

  static className = 'ui-button'

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: 'shorthand',
    }),
    circular: PropTypes.bool,
    disabled: PropTypes.bool,
    fluid: PropTypes.bool,
    icon: customPropTypes.itemShorthandWithoutJSX,
    iconOnly: PropTypes.bool,
    iconPosition: PropTypes.oneOf(['before', 'after']),
    loader: customPropTypes.itemShorthandWithoutJSX,
    loading: PropTypes.bool,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    primary: customPropTypes.every([customPropTypes.disallow(['secondary']), PropTypes.bool]),
    text: PropTypes.bool,
    secondary: customPropTypes.every([customPropTypes.disallow(['primary']), PropTypes.bool]),
    size: customPropTypes.size,
  }

  static defaultProps = {
    as: 'button',
    accessibility: buttonBehavior as Accessibility,
    size: 'medium',
  }

  static Group = ButtonGroup

  actionHandlers = {
    performClick: event => {
      event.preventDefault()
      this.handleClick(event)
    },
  }

  renderComponent({
    ElementType,
    classes,
    accessibility,
    variables,
    styles,
    unhandledProps,
  }): React.ReactNode {
    const { children, content, disabled, iconPosition, loading } = this.props
    const hasChildren = childrenExist(children)

    return (
      <ElementType
        className={classes.root}
        disabled={disabled}
        onClick={this.handleClick}
        onFocus={this.handleFocus}
        {...accessibility.attributes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        {hasChildren && children}
        {!hasChildren && loading && this.renderLoader(variables, styles)}
        {!hasChildren && iconPosition !== 'after' && this.renderIcon(variables, styles)}
        {Box.create(!hasChildren && content, {
          defaultProps: () => ({ as: 'span', styles: styles.content }),
        })}
        {!hasChildren && iconPosition === 'after' && this.renderIcon(variables, styles)}
      </ElementType>
    )
  }

  renderIcon = (variables, styles) => {
    const { icon, iconPosition, content } = this.props

    return Icon.create(icon, {
      defaultProps: () => ({
        styles: styles.icon,
        xSpacing: !content ? 'none' : iconPosition === 'after' ? 'before' : 'after',
        variables: variables.icon,
      }),
    })
  }

  renderLoader = (variables, styles) => {
    const { loader } = this.props

    return Loader.create(loader || {}, {
      defaultProps: () => ({
        role: undefined,
        styles: styles.loader,
      }),
    })
  }

  handleClick = (e: React.SyntheticEvent) => {
    const { disabled } = this.props

    if (disabled) {
      e.preventDefault()
      return
    }

    _.invoke(this.props, 'onClick', e, this.props)
  }

  handleFocus = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onFocus', e, this.props)
  }
}

Button.create = createShorthandFactory({ Component: Button, mappedProp: 'content' })

/**
 * A Button enables users to take an action, such as submitting a form, opening a dialog, etc.
 *
 * @accessibility
 * Implements [ARIA Button](https://www.w3.org/TR/wai-aria-practices-1.1/#button) design pattern.
 */
export default withSafeTypeForAs<typeof Button, ButtonProps, 'button'>(Button)
