import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { UIComponent, customPropTypes, createShorthandFactory } from '../../lib'
import { Extendable, ItemShorthand } from '../../../types/utils'
import { ComponentVariablesInput, ComponentPartStyle } from '../../../types/theme'
import Icon from '../Icon/Icon'
import Button from '../Button/Button'
import Text from '../Text/Text'

export type AttachmentProps = {
  action?: ItemShorthand
  actionable?: boolean
  as?: any
  children?: React.ReactChildren
  description?: ItemShorthand
  header?: ItemShorthand
  icon?: ItemShorthand
  progress?: string | number
  styles?: ComponentPartStyle
  variables?: ComponentVariablesInput
}

/**
 * An Attachment displays a file attachment.
 */
class Attachment extends UIComponent<Extendable<AttachmentProps>, any> {
  static create: Function

  static className = 'ui-attachment'

  static displayName = 'Attachment'

  static propTypes = {
    /** Button shorthand for the action slot. */
    action: customPropTypes.itemShorthand,

    /** An Attachment can be styled to indicate possible user interaction. */
    actionable: PropTypes.bool,

    /** An element type to render as. */
    as: customPropTypes.as,

    /** Define your own children.
     *  @docSiteIgnore
     */
    children: PropTypes.node,

    /** A string describing the attachment. */
    description: customPropTypes.itemShorthand,

    /** The name of the attachment. */
    header: customPropTypes.itemShorthand,

    /** Shorthand for the icon. */
    icon: customPropTypes.itemShorthand,

    /** Value indicating percent complete. */
    progress: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /** Custom styles to be applied to the component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied to the component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  renderComponent({ ElementType, classes, rest, styles, variables }) {
    const { header, description, icon, action, progress } = this.props

    return (
      <ElementType {...rest} className={classes.root}>
        <div className={classes.icon}>
          {Icon.create(icon, {
            defaultProps: {
              size: 'big',
            },
          })}
        </div>
        {(header || description) && (
          <div className={classes.content}>
            {Text.create(header, {
              defaultProps: {
                className: classes.header,
              },
            })}

            {Text.create(description, {
              defaultProps: {
                className: classes.description,
              },
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
        {!_.isNil(progress) && <div className={classes.progress} />}
      </ElementType>
    )
  }
}

Attachment.create = createShorthandFactory(Attachment, header => ({ header }))

export default Attachment
