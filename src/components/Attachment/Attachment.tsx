import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { UIComponent, customPropTypes, createShorthandFactory, createHTMLDivision } from '../../lib'
import { Extendable, ShorthandRenderFunction, ShorthandValue } from '../../../types/utils'
import Icon from '../Icon/Icon'
import Button from '../Button/Button'
import Text from '../Text/Text'
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

  /**
   * A custom render function the action slot.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderAction?: ShorthandRenderFunction

  /**
   * A custom render function the description slot.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderDescription?: ShorthandRenderFunction

  /**
   * A custom render function the header slot.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderHeader?: ShorthandRenderFunction

  /**
   * A custom render function the icon slot.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderIcon?: ShorthandRenderFunction

  /**
   * A custom render function the progress slot.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderProgress?: ShorthandRenderFunction
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
    renderAction: PropTypes.func,
    renderDescription: PropTypes.func,
    renderHeader: PropTypes.func,
    renderIcon: PropTypes.func,
    renderProgress: PropTypes.func,
  }

  renderComponent({ ElementType, classes, rest, styles, variables }) {
    const {
      header,
      description,
      icon,
      action,
      progress,
      renderIcon,
      renderHeader,
      renderDescription,
      renderAction,
      renderProgress,
    } = this.props

    return (
      <ElementType {...rest} className={classes.root}>
        {icon && (
          <div className={classes.icon}>
            {Icon.create(icon, {
              defaultProps: { size: 'big' },
              render: renderIcon,
            })}
          </div>
        )}
        {(header || description) && (
          <div className={classes.content}>
            {Text.create(header, {
              defaultProps: { className: classes.header },
              render: renderHeader,
            })}

            {Text.create(description, {
              defaultProps: { className: classes.description },
              render: renderDescription,
            })}
          </div>
        )}
        {action && (
          <div className={classes.action}>
            {Button.create(action, {
              defaultProps: { iconOnly: true, text: true },
              render: renderAction,
            })}
          </div>
        )}
        {!_.isNil(progress) &&
          createHTMLDivision('', {
            defaultProps: { className: classes.progress },
            render: renderProgress,
          })}
      </ElementType>
    )
  }
}

Attachment.create = createShorthandFactory(Attachment, header => ({ header }))

export default Attachment
