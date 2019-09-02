import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  AutoControlledComponent,
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
import {
  ComponentEventHandler,
  WithAsProp,
  ShorthandValue,
  withSafeTypeForAs,
  ShorthandCollection,
} from '../../types'
import Box, { BoxProps } from '../Box/Box'
import Button, { ButtonProps } from '../Button/Button'
import Icon, { IconProps } from '../Icon/Icon'
import Text, { TextProps } from '../Text/Text'

import ButtonGroup, { ButtonGroupProps } from '../Button/ButtonGroup'

export interface AlertSlotClassNames {
  content: string
  actions: string
  dismissAction: string
  icon: string
  header: string
  body: string
}

export interface AlertProps
  extends UIComponentProps,
    ContentComponentProps<ShorthandValue<BoxProps>> {
  /**
   * Accessibility behavior if overridden by the user.
   * @available alertWarningBehavior
   */
  accessibility?: Accessibility

  /** An Alert can contain action buttons. */
  actions?: ShorthandValue<ButtonGroupProps> | ShorthandCollection<ButtonProps>

  /** An alert may contain an icon. */
  icon?: ShorthandValue<IconProps>

  /** An alert may contain a header. */
  header?: ShorthandValue<TextProps>

  /** Controls Alert's relation to neighboring items. */
  attached?: boolean | 'top' | 'bottom'

  /** An alert can only take up the width of its content. */
  fitted?: boolean

  /** An alert may be formatted to display a danger message. */
  danger?: boolean

  /** A default value for the `visible` prop. */
  defaultVisible?: boolean

  /** An alert can be dismissible. */
  dismissible?: boolean

  /**
   * A button shorthand for the dismiss action slot. To use this slot the alert should be
   * dismissible.
   */
  dismissAction?: ShorthandValue<ButtonProps>

  /** An alert may be formatted to display information. */
  info?: boolean

  /**
   * Called after user will dismiss the alert.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onDismiss?: ComponentEventHandler<AlertProps>

  /**
   * Called after user's focus.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onFocus?: ComponentEventHandler<AlertProps>

  /** An alert may be formatted to display a successful message. */
  success?: boolean

  /** An alert can be set to visible to force itself to be shown. */
  visible?: boolean

  /** An alert may be formatted to display a warning message. */
  warning?: boolean

  /** Body contains header and content elements. */
  body?: ShorthandValue<BoxProps>
}

export interface AlertState {
  isFromKeyboard: boolean
  visible: boolean
  bodyId: string
}

class Alert extends AutoControlledComponent<WithAsProp<AlertProps>, AlertState> {
  static displayName = 'Alert'
  static className = 'ui-alert'

  static slotClassNames: AlertSlotClassNames = {
    content: `${Alert.className}__content`,
    actions: `${Alert.className}__actions`,
    dismissAction: `${Alert.className}__dismissAction`,
    icon: `${Alert.className}__icon`,
    header: `${Alert.className}__header`,
    body: `${Alert.className}__body`,
  }

  static propTypes = {
    ...commonPropTypes.createCommon({ content: 'shorthand' }),
    actions: PropTypes.oneOfType([
      customPropTypes.itemShorthand,
      customPropTypes.collectionShorthand,
    ]),
    icon: customPropTypes.itemShorthandWithoutJSX,
    header: customPropTypes.itemShorthand,
    attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['top', 'bottom'])]),
    fitted: PropTypes.bool,
    danger: PropTypes.bool,
    defaultVisible: PropTypes.bool,
    dismissible: PropTypes.bool,
    dismissAction: customPropTypes.itemShorthand,
    info: PropTypes.bool,
    onDismiss: PropTypes.func,
    onFocus: PropTypes.func,
    success: PropTypes.bool,
    visible: PropTypes.bool,
    warning: PropTypes.bool,
    body: customPropTypes.itemShorthand,
  }

  static defaultProps = {
    accessibility: alertBehavior,
    dismissAction: { icon: 'close' },
    body: {},
  }

  static autoControlledProps = ['visible']

  getInitialAutoControlledState(): AlertState {
    return {
      isFromKeyboard: false,
      visible: true,
      bodyId: _.uniqueId('alert-body-'),
    }
  }

  handleDismissOverrides = (predefinedProps: ButtonProps) => ({
    onClick: (e: React.SyntheticEvent, buttonProps: ButtonProps) => {
      _.invoke(predefinedProps, 'onClick', e, buttonProps)

      _.invoke(this.props, 'onDismiss', e, { ...this.props, visible: false })
      this.setState({ visible: false })
    },
  })

  handleFocus = (e: React.SyntheticEvent) => {
    this.setState({ isFromKeyboard: isFromKeyboard() })

    _.invoke(this.props, 'onFocus', e, this.props)
  }

  renderContent = ({ styles, accessibility }: RenderResultConfig<AlertProps>) => {
    const { actions, dismissible, dismissAction, content, icon, header, body } = this.props

    const bodyContent = (
      <>
        {Text.create(header, {
          defaultProps: {
            className: Alert.slotClassNames.header,
            styles: styles.header,
            ...accessibility.attributes.header,
          },
        })}
        {Box.create(content, {
          defaultProps: {
            className: Alert.slotClassNames.content,
            styles: styles.content,
            ...accessibility.attributes.content,
          },
        })}
      </>
    )

    return (
      <>
        {Icon.create(icon, {
          defaultProps: {
            className: Alert.slotClassNames.icon,
            styles: styles.icon,
          },
        })}
        {Box.create(body, {
          defaultProps: {
            id: this.state.bodyId,
            className: Alert.slotClassNames.body,
            ...accessibility.attributes.body,
            styles: styles.body,
          },
          overrideProps: {
            children: bodyContent,
          },
        })}

        {ButtonGroup.create(actions, {
          defaultProps: {
            className: Alert.slotClassNames.actions,
            styles: styles.actions,
          },
        })}
        {dismissible &&
          Button.create(dismissAction, {
            defaultProps: {
              iconOnly: true,
              text: true,
              className: Alert.slotClassNames.dismissAction,
              styles: styles.dismissAction,
              ...accessibility.attributes.dismissAction,
            },
            overrideProps: this.handleDismissOverrides,
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

/**
 * An Alert displays a brief, important message to attract the user's attention without interrupting the user's task.
 *
 * @accessibility
 * Implements [ARIA Alert](https://www.w3.org/TR/wai-aria-practices-1.1/#alert) design pattern.
 */
export default withSafeTypeForAs<typeof Alert, AlertProps>(Alert)
