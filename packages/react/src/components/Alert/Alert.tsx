import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  UIComponent,
  UIComponentProps,
  ContentComponentProps,
  commonPropTypes,
  childrenExist,
  isFromKeyboard,
  rtlTextContainer,
} from '../../lib'
import { RenderResultConfig } from '../../lib/renderComponent'
import { alertBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/types'
import { ComponentEventHandler, ReactProps, ShorthandValue } from '../../types'
import Box from '../Box/Box'
import Button, { ButtonProps } from '../Button/Button'

export interface AlertSlotClassNames {
  content: string
  action: string
}

export interface AlertProps extends UIComponentProps, ContentComponentProps<ShorthandValue> {
  /**
   * Accessibility behavior if overridden by the user.
   * @default alertBehavior
   * @available alertWarningBehavior
   */
  accessibility?: Accessibility

  /** Button shorthand for the action slot. */
  action?: ShorthandValue<ButtonProps>

  /** Controls Alert's relation to neighboring items. */
  attached?: boolean | 'top' | 'bottom'

  /** An alert may be formatted to display a danger message. */
  danger?: boolean

  /** An alert may be formatted to display information. */
  info?: boolean

  /**
   * Called after user's focus.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onFocus?: ComponentEventHandler<AlertProps>

  /** An alert may be formatted to display a successful message. */
  success?: boolean

  /** An alert may be formatted to display a warning message. */
  warning?: boolean
}

export interface AlertState {
  isFromKeyboard: boolean
}

/**
 * A Alert displays information that explains nearby content.
 * @accessibility
 * Other considerations:
 *  - by default, content from warning and danger variants is announced by the screen reader. To announce the content of other variants, a mechanism similar to react-aria-live can be used
 *  - if Alert contains action slot, textual representation needs to be provided by using 'title', 'aria-label' or 'aria-labelledby' attributes
 */
class Alert extends UIComponent<ReactProps<AlertProps>, AlertState> {
  static displayName = 'Alert'
  static className = 'ui-alert'

  static slotClassNames: AlertSlotClassNames = {
    content: `${Alert.className}__content`,
    action: `${Alert.className}__action`,
  }

  static propTypes = {
    ...commonPropTypes.createCommon({ content: 'shorthand' }),
    action: customPropTypes.itemShorthand,
    attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['top', 'bottom'])]),
    danger: PropTypes.bool,
    info: PropTypes.bool,
    onFocus: PropTypes.func,
    success: PropTypes.bool,
    warning: PropTypes.bool,
  }

  static defaultProps = { accessibility: alertBehavior }

  state = { isFromKeyboard: false }

  handleFocus = (e: React.SyntheticEvent) => {
    this.setState({ isFromKeyboard: isFromKeyboard() })

    _.invoke(this.props, 'onFocus', e, this.props)
  }

  renderContent = ({ styles, accessibility }: RenderResultConfig<AlertProps>) => {
    const { action, content } = this.props

    return (
      <>
        {Box.create(content, {
          defaultProps: {
            className: Alert.slotClassNames.content,
            styles: styles.content,
            ...accessibility.attributes.content,
          },
        })}
        {Button.create(action, {
          defaultProps: {
            iconOnly: true,
            text: true,
            className: Alert.slotClassNames.action,
            styles: styles.action,
          },
        })}
      </>
    )
  }

  renderComponent(config: RenderResultConfig<AlertProps>) {
    const { accessibility, classes, ElementType, unhandledProps } = config
    const { children, content } = this.props

    return (
      <ElementType
        className={classes.root}
        onFocus={this.handleFocus}
        {...accessibility.attributes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children, content] })}
        {...unhandledProps}
      >
        {childrenExist(children) ? children : this.renderContent(config)}
      </ElementType>
    )
  }
}

export default Alert
