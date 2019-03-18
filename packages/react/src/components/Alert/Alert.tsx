import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  UIComponent,
  UIComponentProps,
  ContentComponentProps,
  commonPropTypes,
  customPropTypes,
  childrenExist,
  rtlTextContainer,
} from '../../lib'
import { RenderResultConfig } from 'src/lib/renderComponent'
import { defaultBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/types'
import { ComponentEventHandler, ReactProps, ShorthandValue } from '../../types'
import Box from '../Box/Box'
import Button, { ButtonProps } from '../Button/Button'

export interface AlertSlotClassNames {
  content: string
  closeButton: string
}

export interface AlertProps extends UIComponentProps, ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default defaultBehavior
   */
  accessibility?: Accessibility

  /** Controls Alert's relation to neighboring items. */
  attached?: boolean | 'top' | 'bottom'

  /** Button used for dismissing the Alert. */
  closeButton?: ShorthandValue<ButtonProps>

  /** An alert may be formatted to display a danger message. */
  danger?: boolean

  /** An alert may be formatted to display information. */
  info?: boolean

  /**
   * The callback used when the user chooses to hide the Alert.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onClose?: ComponentEventHandler<AlertProps>

  /** An alert may be formatted to display a successful message. */
  success?: boolean

  /** An alert may be formatted to display a warning message. */
  warning?: boolean
}

/**
 * A Alert displays information that explains nearby content.
 */
class Alert extends UIComponent<ReactProps<AlertProps>> {
  static displayName = 'Alert'
  static className = 'ui-alert'

  static slotClassNames: AlertSlotClassNames = {
    content: `${Alert.className}__content`,
    closeButton: `${Alert.className}__closeButton`,
  }

  static propTypes = {
    ...commonPropTypes.createCommon(),
    attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['top', 'bottom'])]),
    closeButton: customPropTypes.itemShorthand,
    danger: PropTypes.bool,
    info: PropTypes.bool,
    onClose: PropTypes.func,
    success: PropTypes.bool,
    warning: PropTypes.bool,
  }

  static defaultProps = {
    accessibility: defaultBehavior,
    closeButton: { icon: 'close' },
  }

  handleCloseButtonOverrides = (predefinedProps: ButtonProps) => ({
    onClick: (e: React.SyntheticEvent, buttonProps: ButtonProps) => {
      this.handleOnClose(e)
      _.invoke(predefinedProps, 'onClick', e, buttonProps)
    },
  })

  handleOnClose = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onClose', e, this.props)
  }

  renderContent = ({ styles }: RenderResultConfig<AlertProps>) => {
    const { closeButton, content, onClose } = this.props
    return (
      <>
        {Box.create(content, {
          defaultProps: {
            className: Alert.slotClassNames.content,
            styles: styles.content,
          },
        })}
        {onClose &&
          Button.create(closeButton, {
            defaultProps: {
              iconOnly: true,
              text: true,
              className: Alert.slotClassNames.closeButton,
              styles: styles.closeButton,
            },
            overrideProps: this.handleCloseButtonOverrides,
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
