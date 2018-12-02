import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'
import { UIComponent, customPropTypes, createShorthandFactory } from '../../lib'
import { Extendable, ShorthandValue } from '../../../types/utils'
import Icon from '../Icon/Icon'
import Button from '../Button/Button'
import Text from '../Text/Text'
import Slot from '../Slot/Slot'
import { UIComponentProps, ChildrenComponentProps } from '../../lib/commonPropInterfaces'
import { commonUIComponentPropTypes, childrenComponentPropTypes } from '../../lib/commonPropTypes'

export interface AttachmentProps extends UIComponentProps<any, any>, ChildrenComponentProps {
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
    ...commonUIComponentPropTypes,
    ...childrenComponentPropTypes,
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

Attachment.create = createShorthandFactory(Attachment, 'header')

export default Attachment
