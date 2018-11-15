import * as PropTypes from 'prop-types'
import * as React from 'react'

import { UIComponent, customPropTypes, childrenExist, createShorthandFactory } from '../../lib'
import { Extendable, ShorthandValue, ShorthandRenderFunction } from '../../../types/utils'
import Text from '../Text/Text'
import { createSlot } from '../Slot/Slot'
import Input from '../Input/Input'
import { UIComponentProps, ChildrenComponentProps } from '../../lib/commonPropInterfaces'
import { commonUIComponentPropTypes, childrenComponentPropTypes } from '../../lib/commonPropTypes'

export interface FormFieldProps extends UIComponentProps<any, any>, ChildrenComponentProps {
  /** A control for the form field. */
  control?: ShorthandValue

  /** The HTML input id. This will be set on the control element and will be use for linking it with the label for correct accessibility. */
  id?: string

  /** A field can have its label next to instead of above it. */
  inline?: boolean

  /** A label for the form field. */
  label?: ShorthandValue

  /** Text message that will be displayed below the control (can be used for error, warning, success messages). */
  message?: ShorthandValue

  /** The HTML input name. */
  name?: string

  /**
   * A custom render function for the control slot.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderControl?: ShorthandRenderFunction

  /**
   * A custom render function for the label slot.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderLabel?: ShorthandRenderFunction

  /**
   * A custom render function for the message slot.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderMessage?: ShorthandRenderFunction

  /** A field can show that input is mandatory. */
  required?: boolean

  /** The HTML input type. */
  type?: string
}

/**
 * A field is a form element containing a label and an input.
 */
class FormField extends UIComponent<Extendable<FormFieldProps>, any> {
  public static displayName = 'FormField'

  public static className = 'ui-form__field'

  static create: Function

  public static propTypes = {
    ...commonUIComponentPropTypes,
    ...childrenComponentPropTypes,
    control: customPropTypes.itemShorthand,
    id: PropTypes.string,
    inline: PropTypes.bool,
    label: customPropTypes.itemShorthand,
    message: customPropTypes.itemShorthand,
    name: PropTypes.string,
    renderControl: PropTypes.func,
    renderLabel: PropTypes.func,
    renderMessage: PropTypes.func,
    required: PropTypes.bool,
    type: PropTypes.string,
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

    const controlElement = createSlot(control || {}, {
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

FormField.create = createShorthandFactory(FormField, label => ({ label }))

export default FormField
