import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  UIComponent,
  customPropTypes,
  childrenExist,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
} from '../../lib'
import { ReactProps, ShorthandValue } from '../../../types/utils'
import Text from '../Text/Text'
import Input from '../Input/Input'
import Box from '../Box/Box'

export interface FormFieldProps extends UIComponentProps, ChildrenComponentProps {
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

  /** A field can show that input is mandatory. */
  required?: boolean

  /** The HTML input type. */
  type?: string
}

/**
 * A field is a form element containing a label and an input.
 */
class FormField extends UIComponent<ReactProps<FormFieldProps>, any> {
  public static displayName = 'FormField'

  public static className = 'ui-form__field'

  static create: Function

  public static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    control: customPropTypes.itemShorthand,
    id: PropTypes.string,
    inline: PropTypes.bool,
    label: customPropTypes.itemShorthand,
    message: customPropTypes.itemShorthand,
    name: PropTypes.string,
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
    unhandledProps,
  }): React.ReactNode {
    const { children, control, id, label, message, name, required, type } = this.props

    const labelElement = Text.create(label, {
      defaultProps: {
        as: 'label',
        htmlFor: id,
        styles: styles.label,
      },
    })

    const messageElement = Text.create(message, {
      defaultProps: {
        styles: styles.message,
      },
    })

    const controlElement = Box.create(control || {}, {
      defaultProps: { required, id, name, type, styles: styles.control },
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
      <ElementType className={classes.root} {...unhandledProps}>
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
