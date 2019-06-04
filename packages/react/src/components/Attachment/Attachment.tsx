import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'
import { WithAsProp, ShorthandValue, ComponentEventHandler, withSafeTypeForAs } from '../../types'
import {
  UIComponent,
  createShorthandFactory,
  commonPropTypes,
  isFromKeyboard,
  applyAccessibilityKeyHandlers,
} from '../../lib'
import Icon from '../Icon/Icon'
import Button from '../Button/Button'
import Text from '../Text/Text'
import Box from '../Box/Box'
import { UIComponentProps, ChildrenComponentProps } from '../../lib/commonPropInterfaces'
import { Accessibility } from '../../lib/accessibility/types'
import { attachmentBehavior } from '../../lib/accessibility'

export interface AttachmentProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default attachmentBehavior
   */
  accessibility?: Accessibility

  /** Button shorthand for the action slot. */
  action?: ShorthandValue

  /** An Attachment can be styled to indicate possible user interaction. */
  actionable?: boolean

  /** A string describing the attachment. */
  description?: ShorthandValue

  /** An attachment can show it is currently unable to be interacted with. */
  disabled?: boolean

  /** The name of the attachment. */
  header?: ShorthandValue

  /** Shorthand for the icon. */
  icon?: ShorthandValue

  /** Value indicating percent complete. */
  progress?: string | number

  /**
   * Called after user's click.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: ComponentEventHandler<AttachmentProps>

  /**
   * Called after user's focus.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onFocus?: ComponentEventHandler<AttachmentProps>
}

export interface AttachmentState {
  isFromKeyboard: boolean
}

class Attachment extends UIComponent<WithAsProp<AttachmentProps>, AttachmentState> {
  static create: Function

  static className = 'ui-attachment'

  static displayName = 'Attachment'

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    action: customPropTypes.itemShorthand,
    actionable: PropTypes.bool,
    description: customPropTypes.itemShorthand,
    header: customPropTypes.itemShorthand,
    icon: customPropTypes.itemShorthand,
    progress: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }

  static defaultProps = {
    accessibility: attachmentBehavior as Accessibility,
  }

  public state = {
    isFromKeyboard: false,
  }

  renderComponent({ ElementType, classes, unhandledProps, styles, variables, accessibility }) {
    const { header, description, icon, action, progress } = this.props

    return (
      <ElementType
        className={classes.root}
        onClick={this.handleClick}
        onFocus={this.handleFocus}
        {...accessibility.attributes.root}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        {icon &&
          Icon.create(icon, {
            defaultProps: { size: 'larger', styles: styles.icon },
          })}
        {(header || description) && (
          <div className={classes.content}>
            {Text.create(header, {
              defaultProps: { styles: styles.header },
            })}

            {Text.create(description, {
              defaultProps: { styles: styles.description },
            })}
          </div>
        )}
        {action &&
          Button.create(action, {
            defaultProps: { iconOnly: true, text: true, styles: styles.action },
          })}
        {!_.isNil(progress) &&
          Box.create('', {
            defaultProps: { styles: styles.progress },
          })}
      </ElementType>
    )
  }

  protected actionHandlers = {
    performClick: event => this.performClick(event),
  }

  private performClick = e => {
    e.stopPropagation()
    this.handleClick(e)
  }

  private handleClick = (e: React.SyntheticEvent) => {
    const { disabled } = this.props

    if (disabled) {
      e.preventDefault()
      return
    }

    _.invoke(this.props, 'onClick', e, this.props)
  }

  private handleFocus = (e: React.SyntheticEvent) => {
    this.setState({ isFromKeyboard: isFromKeyboard() })

    _.invoke(this.props, 'onFocus', e, this.props)
  }
}

Attachment.create = createShorthandFactory({ Component: Attachment, mappedProp: 'header' })

/**
 * An Attachment displays a file attachment.
 */
export default withSafeTypeForAs<typeof Attachment, AttachmentProps>(Attachment)
