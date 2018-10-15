import * as PropTypes from 'prop-types'
import * as React from 'react'

import { UIComponent, customPropTypes, childrenExist, createShorthandFactory } from '../../lib'
import { ComponentVariablesInput, ComponentPartStyle } from '../../../types/theme'
import {
  Extendable,
  ReactChildren,
  ShorthandValue,
  ShorthandRenderFunction,
} from '../../../types/utils'
import Text from '../Text'

export interface IFormFieldProps {
  as?: any
  children?: ReactChildren
  className?: string
  label?: ShorthandValue
  renderLabel?: ShorthandRenderFunction
  control?: React.ReactType<any>
  inline?: boolean
  message?: ShorthandValue
  renderMessage?: ShorthandRenderFunction
  required?: boolean
  styles?: ComponentPartStyle
  variables?: ComponentVariablesInput
}

/**
 * A field is a form element containing a label and an input.
 */
class FormField extends UIComponent<Extendable<IFormFieldProps>, any> {
  public static displayName = 'FormField'

  public static className = 'ui-form__field'

  static create: Function

  public static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /**
     *  Button content for childrenApi
     *  @docSiteIgnore
     */
    children: PropTypes.node,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /**
     * A form control component (i.e. Input) or HTML tagName (i.e. 'input').
     * Extra FormField props are passed to the control component.
     * Mutually exclusive with children.
     */
    control: customPropTypes.some([
      PropTypes.func,
      PropTypes.oneOf(['button', 'input', 'select', 'textarea']),
    ]),

    /** A label for the form field. */
    label: customPropTypes.itemShorthand,

    /**
     * A custom render function for the label slot.
     *
     * @param {React.ReactType} Component - The computed component for this slot.
     * @param {object} props - The computed props for this slot.
     * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
     */
    renderLabel: PropTypes.func,

    /** A field can have its label next to instead of above it. */
    inline: PropTypes.bool,

    /** A field can show that input is mandatory. */
    required: PropTypes.bool,

    /** Text message that will be displayed below the control (can be used for error, warning, success messages). */
    message: customPropTypes.itemShorthand,

    /**
     * A custom render function for the message slot.
     *
     * @param {React.ReactType} Component - The computed component for this slot.
     * @param {object} props - The computed props for this slot.
     * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
     */
    renderMessage: PropTypes.func,

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  public static defaultProps = {
    as: 'div',
  }

  public renderComponent({
    ElementType,
    classes,
    accessibility,
    variables,
    styles,
    rest,
  }): React.ReactNode {
    const {
      children,
      control,
      label,
      content,
      id,
      type,
      required,
      renderLabel,
      message,
      renderMessage,
    } = this.props

    let labelContent = label

    if (required) {
      labelContent =
        typeof label === 'string'
          ? `${label} *`
          : typeof label === 'object' && (label as any).content
            ? { ...label, content: `${(label as any).content} *` }
            : label
    }

    const labelElement = Text.create(labelContent, {
      defaultProps: {
        as: 'label',
        htmlFor: id,
        styles: styles.label,
      },
      render: renderLabel,
    })

    const messageElement = Text.create(message, {
      defaultProps: {
        styles: styles.message,
      },
      render: renderMessage,
    })

    const controlElement = control && React.createElement(control, { required, ...rest })

    // ----------------------------------------
    // No Control
    // ----------------------------------------

    if (!control) {
      if (!label) {
        return (
          <ElementType {...rest} className={classes.root}>
            {!childrenExist(children) ? content : children}
            {messageElement}
          </ElementType>
        )
      }

      return (
        <ElementType {...rest} className={classes.root}>
          {labelElement}
          {messageElement}
        </ElementType>
      )
    }

    // --------------------------------------------------------
    // Check box or radio (label should appear after the input)
    // --------------------------------------------------------

    if (control && (type === 'checkbox' || type === 'radio')) {
      return (
        <ElementType className={classes.root}>
          {controlElement}
          {labelElement}
          {messageElement}
        </ElementType>
      )
    }

    return (
      <ElementType className={classes.root}>
        {labelElement}
        {controlElement}
        {messageElement}
      </ElementType>
    )
  }
}

FormField.create = createShorthandFactory(FormField, content => ({ content }))

export default FormField
