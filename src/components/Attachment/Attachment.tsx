import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'
import { Extendable, ShorthandValue } from '../../../types/utils'
import {
  UIComponent,
  customPropTypes,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  forwardRefFactory,
} from '../../lib'
import Icon from '../Icon/Icon'
import Button from '../Button/Button'
import Text from '../Text/Text'
import Slot from '../Slot/Slot'

export interface AttachmentProps extends UIComponentProps, ChildrenComponentProps {
  /** Button shorthand for the action slot. */
  action?: ShorthandValue

  /** An Attachment can be styled to indicate possible user interaction. */
  actionable?: boolean

  /** A string describing the attachment. */
  description?: ShorthandValue

  /** The name of the attachment. */
  header?: ShorthandValue

  /** Shorthand for the icon. */
  icon?: ShorthandValue

  /** Value indicating percent complete. */
  progress?: string | number
}

/**
 * An Attachment displays a file attachment.
 */
class Attachment extends UIComponent<Extendable<AttachmentProps>, any> {
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

  renderComponent({ ElementType, classes, rest, styles, variables }) {
    const { header, description, icon, action, progress } = this.props

    return (
      <ElementType {...rest} className={classes.root}>
        {icon && (
          <div className={classes.icon}>
            {Icon.create(icon, {
              defaultProps: { size: 'big' },
            })}
          </div>
        )}
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
        {action && (
          <div className={classes.action}>
            {Button.create(action, {
              defaultProps: { iconOnly: true, text: true },
            })}
          </div>
        )}
        {!_.isNil(progress) &&
          Slot.create('', {
            defaultProps: { className: classes.progress },
          })}
      </ElementType>
    )
  }
}

const ForwardedAttachment = forwardRefFactory(Attachment)
ForwardedAttachment.create = createShorthandFactory(ForwardedAttachment, 'header')

export default ForwardedAttachment
