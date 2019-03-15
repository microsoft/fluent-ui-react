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
import { Box, Icon } from '../..'

export type AlertSlotClassNames = Record<'content' | 'closeIcon', string>

export interface AlertProps extends UIComponentProps, ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default defaultBehavior
   */
  accessibility?: Accessibility

  /** Controls Alert's relation to neighboring items. */
  attached?: boolean | 'top' | 'bottom'

  /** Icon used for dismissing the Alert, 'close' by default. */
  closeIcon?: ShorthandValue

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
class Alert extends UIComponent<ReactProps<AlertProps>, {}> {
  static displayName = 'Alert'
  static className = 'ui-alert'

  static slotClassNames: AlertSlotClassNames = {
    content: `${Alert.className}__content`,
    closeIcon: `${Alert.className}__closeIcon`,
  }

  static propTypes = {
    ...commonPropTypes.createCommon(),
    attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['top', 'bottom'])]),
    closeIcon: customPropTypes.itemShorthand,
    danger: PropTypes.bool,
    info: PropTypes.bool,
    onClose: PropTypes.func,
    success: PropTypes.bool,
    warning: PropTypes.bool,
  }

  static defaultProps = {
    accessibility: defaultBehavior,
    closeIcon: 'close',
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

  private renderContent = ({ styles, variables }: RenderResultConfig<AlertProps>) => {
    const { closeIcon, content, onClose } = this.props
    return (
      <>
        {Box.create(content, {
          defaultProps: {
            className: Alert.slotClassNames.content,
            styles: styles.content,
          },
        })}
        {onClose &&
          Icon.create(closeIcon, {
            defaultProps: {
              className: Alert.slotClassNames.closeIcon,
              styles: styles.icon,
              variables: variables.icon,
            },
            overrideProps: this.handleCloseIconOverrides,
          })}
      </>
    )
  }

  private handleCloseIconOverrides = (predefinedProps: AlertProps) => ({
    onClick: (e: React.SyntheticEvent) => {
      this.handleOnClose(e)
      _.invoke(predefinedProps, 'onClick', e, this.props)
    },
    ...(predefinedProps.onClick && { tabIndex: '0' }),
  })

  private handleOnClose = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onClose', e, { ...this.props })
  }
}

export default Alert
