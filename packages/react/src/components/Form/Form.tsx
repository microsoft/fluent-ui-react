import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import {
  UIComponent,
  childrenExist,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
} from '../../lib'
import { Accessibility } from '../../lib/accessibility/types'
import {
  ComponentEventHandler,
  WithAsProp,
  ShorthandCollection,
  withSafeTypeForAs,
} from '../../types'
import FormField, { FormFieldProps } from './FormField'

export interface FormSlotClassNames {
  field: string
}

export interface FormProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility

  /** The HTML form action. */
  action?: string

  /** Shorthand array of props for the Form.Fields inside the Form. */
  fields?: ShorthandCollection<FormFieldProps>

  /**
   * The HTML form submit handler.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onSubmit?: ComponentEventHandler<FormProps>
}

class Form extends UIComponent<WithAsProp<FormProps>, any> {
  static create: Function

  static displayName = 'Form'

  static className = 'ui-form'

  static slotClassNames: FormSlotClassNames = {
    field: `${Form.className}__field`,
  }

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    action: PropTypes.string,
    fields: customPropTypes.collectionShorthand,
    onSubmit: PropTypes.func,
  }

  static defaultProps = {
    as: 'form',
  }

  static Field = FormField

  renderComponent({ accessibility, ElementType, classes, unhandledProps }): React.ReactNode {
    const { action, children } = this.props
    return (
      <ElementType
        className={classes.root}
        action={action}
        onSubmit={this.handleSubmit}
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...accessibility.attributes.root}
        {...unhandledProps}
      >
        {childrenExist(children) ? children : this.renderFields()}
      </ElementType>
    )
  }

  handleSubmit = (e, ...args) => {
    const { action } = this.props

    // Heads up! Third party libs can pass own data as first argument, we need to check that it has preventDefault()
    // method.
    if (!action) _.invoke(e, 'preventDefault')
    _.invoke(this.props, 'onSubmit', e, this.props, ...args)
  }

  renderFields = () => {
    const { fields } = this.props
    return _.map(fields, field =>
      FormField.create(field, { defaultProps: { className: Form.slotClassNames.field } }),
    )
  }
}

/**
 * A Form displays a set of related user input fields in a structured way.
 */
export default withSafeTypeForAs<typeof Form, FormProps, 'form'>(Form)
