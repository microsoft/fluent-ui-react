import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import { UIComponent, childrenExist, customPropTypes } from '../../lib'
import { ComponentVariablesInput, ComponentSlotStyle } from '../../../types/theme'
import {
  ComponentEventHandler,
  Extendable,
  ReactChildren,
  ShorthandValue,
  ShorthandRenderFunction,
} from '../../../types/utils'
import FormField from './FormField'

export interface FormProps {
  action?: string
  as?: any
  children?: ReactChildren
  className?: string
  content?: ShorthandValue
  fields?: ShorthandValue[]
  onSubmit?: ComponentEventHandler<FormProps>
  renderField?: ShorthandRenderFunction
  styles?: ComponentSlotStyle
  variables?: ComponentVariablesInput
}

/**
 * A Form displays a set of related user input fields in a structured way.
 * @accessibility
 * Label needs to be provided by using 'aria-label', or 'aria-labelledby' attributes on the <form> element.
 */
class Form extends UIComponent<Extendable<FormProps>, any> {
  static create: Function

  public static displayName = 'Form'

  public static className = 'ui-form'

  public static propTypes = {
    /** The HTML form action. */
    action: PropTypes.string,

    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /**
     *  Form content for childrenApi.
     *  @docSiteIgnore
     */
    children: PropTypes.node,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Shorthand array of props for the Form.Fields inside the Form. */
    fields: customPropTypes.collectionShorthand,

    /**
     * The HTML form submit handler.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onSubmit: PropTypes.func,

    /**
     * A custom render iterator for rendering each of the Form fields.
     * The default component, props, and children are available for each field.
     *
     * @param {React.ReactType} Component - The computed component for this slot.
     * @param {object} props - The computed props for this slot.
     * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
     */
    renderField: PropTypes.func,

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  public static defaultProps = {
    as: 'form',
  }

  public static Field = FormField

  public renderComponent({
    ElementType,
    classes,
    accessibility,
    variables,
    styles,
    rest,
  }): React.ReactNode {
    const { action, children } = this.props
    return (
      <ElementType className={classes.root} action={action} onSubmit={this.handleSubmit} {...rest}>
        {childrenExist(children) ? children : this.renderFields()}
      </ElementType>
    )
  }

  private handleSubmit = (e, ...args) => {
    const { action } = this.props

    // Heads up! Third party libs can pass own data as first argument, we need to check that it has preventDefault()
    // method.
    if (!action) _.invoke(e, 'preventDefault')
    _.invoke(this.props, 'onSubmit', e, this.props, ...args)
  }

  private renderFields = () => {
    const { fields, renderField } = this.props
    return _.map(fields, field =>
      FormField.create(field, {
        render: renderField,
      }),
    )
  }
}

export default Form
