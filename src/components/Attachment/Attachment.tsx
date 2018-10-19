import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { UIComponent, customPropTypes, createShorthandFactory, createHTMLDivision } from '../../lib'
import { Extendable, ShorthandRenderFunction, ShorthandValue } from '../../../types/utils'
import { ComponentVariablesInput, ComponentSlotStyle } from '../../themes/types'
import Icon from '../Icon/Icon'
import Button from '../Button/Button'
import Text from '../Text/Text'

export type AttachmentProps = {
  action?: ShorthandValue
  actionable?: boolean
  as?: any
  children?: React.ReactChildren
  description?: ShorthandValue
  header?: ShorthandValue
  icon?: ShorthandValue
  progress?: string | number
  renderAction?: ShorthandRenderFunction
  renderDescription?: ShorthandRenderFunction
  renderHeader?: ShorthandRenderFunction
  renderIcon?: ShorthandRenderFunction
  renderProgress?: ShorthandRenderFunction
  styles?: ComponentSlotStyle
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

    /**
     * A custom render function the action slot.
     *
     * @param {React.ReactType} Component - The computed component for this slot.
     * @param {object} props - The computed props for this slot.
     * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
     */
    renderAction: PropTypes.func,

    /**
     * A custom render function the description slot.
     *
     * @param {React.ReactType} Component - The computed component for this slot.
     * @param {object} props - The computed props for this slot.
     * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
     */
    renderDescription: PropTypes.func,

    /**
     * A custom render function the header slot.
     *
     * @param {React.ReactType} Component - The computed component for this slot.
     * @param {object} props - The computed props for this slot.
     * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
     */
    renderHeader: PropTypes.func,

    /**
     * A custom render function the icon slot.
     *
     * @param {React.ReactType} Component - The computed component for this slot.
     * @param {object} props - The computed props for this slot.
     * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
     */
    renderIcon: PropTypes.func,

    /**
     * A custom render function the progress slot.
     *
     * @param {React.ReactType} Component - The computed component for this slot.
     * @param {object} props - The computed props for this slot.
     * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
     */
    renderProgress: PropTypes.func,

    /** Custom styles to be applied to the component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied to the component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
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
          createHTMLDivision(progress, {
            defaultProps: { className: classes.progress },
            render: renderProgress,
          })}
      </ElementType>
    )
  }
}

Attachment.create = createShorthandFactory(Attachment, header => ({ header }))

export default Attachment
