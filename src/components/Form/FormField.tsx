import * as PropTypes from 'prop-types'
import * as React from 'react'

import { UIComponent, customPropTypes, childrenExist, createShorthandFactory } from '../../lib'
import { ComponentVariablesInput, ComponentSlotStyle } from '../../themes/types'
import {
  Extendable,
  ReactChildren,
  ShorthandValue,
  ShorthandRenderFunction,
} from '../../../types/utils'
import Text from '../Text/Text'
import Input from '../Input/Input'
import Slot from '../Slot/Slot'

export interface FormFieldProps {
  as?: any
  children?: ReactChildren
  className?: string
  control?: ShorthandValue
  id?: string
  inline?: boolean
  label?: ShorthandValue
  message?: ShorthandValue
  name?: string
  renderControl?: ShorthandRenderFunction
  renderLabel?: ShorthandRenderFunction
  renderMessage?: ShorthandRenderFunction
  required?: boolean
  styles?: ComponentSlotStyle
  type?: string
  variables?: ComponentVariablesInput
}

/**
 * A field is a form element containing a label and an input.
 */
class FormField extends UIComponent<Extendable<FormFieldProps>, any> {
  public static displayName = 'FormField'

  public static className = 'ui-form__field'

  static create: Function

  public static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /**
     *  FormField content for childrenApi.
     *  @docSiteIgnore
     */
    children: PropTypes.node,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** A control for the form field. */
    control: customPropTypes.itemShorthand,

    /** The HTML input id. This will be set on the control element and will be use for linking it with the label for correct accessibility. */
    id: PropTypes.string,

    /** A field can have its label next to instead of above it. */
    inline: PropTypes.bool,

    /** A label for the form field. */
    label: customPropTypes.itemShorthand,

    /** Text message that will be displayed below the control (can be used for error, warning, success messages). */
    message: customPropTypes.itemShorthand,

    /** The HTML input name. */
    name: PropTypes.string,

    /**
     * A custom render function for the control slot.
     *
     * @param {React.ReactType} Component - The computed component for this slot.
     * @param {object} props - The computed props for this slot.
     * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
     */
    renderControl: PropTypes.func,

    /**
     * A custom render function for the label slot.
     *
     * @param {React.ReactType} Component - The computed component for this slot.
     * @param {object} props - The computed props for this slot.
     * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
     */
    renderLabel: PropTypes.func,

    /**
     * A custom render function for the message slot.
     *
     * @param {React.ReactType} Component - The computed component for this slot.
     * @param {object} props - The computed props for this slot.
     * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
     */
    renderMessage: PropTypes.func,

    /** A field can show that input is mandatory. */
    required: PropTypes.bool,

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** The HTML input type. */
    type: PropTypes.string,

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  public static defaultProps = {
    as: 'div',
    control: { as: Input },
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
      id,
      label,
      message,
      name,
      renderControl,
      renderLabel,
      renderMessage,
      required,
      type,
    } = this.props

    const labelElement = Text.create(label, {
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

    const controlElement = Slot.create(control || {}, {
      defaultProps: { required, id, name, type, styles: styles.control },
      render: renderControl,
    })

    const content = (
      <>
        {this.shouldControlAppearFirst() && controlElement}
        {labelElement}
        {!this.shouldControlAppearFirst() && controlElement}
        {messageElement}
      </>
    )

    return (
      <ElementType className={classes.root} {...rest}>
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }

  private shouldControlAppearFirst = () => {
    const { type } = this.props
    return type && (type === 'checkbox' || type === 'radio')
  }
}

FormField.create = createShorthandFactory(FormField, 'label')

export default FormField
