import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  UIComponent,
  childrenExist,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
} from '../../lib'
import { Accessibility } from '../../lib/accessibility/types'
import { defaultBehavior } from '../../lib/accessibility'
import { ReactProps, ShorthandValue } from '../../types'
import Text from '../Text/Text'
import Input from '../Input/Input'
import Box from '../Box/Box'

export interface FormFieldProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default defaultBehavior
   */
  accessibility?: Accessibility

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
    accessibility: defaultBehavior,
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
      <ElementType className={classes.root} {...accessibility.attributes.root} {...unhandledProps}>
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }

  private shouldControlAppearFirst = () => {
    const { type } = this.props
    return type && (type === 'checkbox' || type === 'radio')
  }
}

FormField.create = createShorthandFactory({ Component: FormField, mappedProp: 'label' })

export default FormField
