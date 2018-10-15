import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import { UIComponent, childrenExist, customPropTypes } from '../../lib'
import { ComponentVariablesInput, ComponentPartStyle } from '../../../types/theme'
import {
  ComponentEventHandler,
  Extendable,
  ReactChildren,
  ShorthandValue,
  ShorthandRenderFunction,
} from '../../../types/utils'
import Grid from '../Grid/Grid'
import FormField from './FormField'

export interface IFormProps {
  action?: string
  as?: any
  children?: ReactChildren
  className?: string
  onSubmit?: ComponentEventHandler<IFormProps>
  columns?: string | number
  fields?: ShorthandValue[]
  renderItem?: ShorthandRenderFunction
  rows?: string | number
  styles?: ComponentPartStyle
  variables?: ComponentVariablesInput
}

/**
 * A Form displays a set of related user input fields in a structured way.
 */
class Form extends UIComponent<Extendable<IFormProps>, any> {
  static create: Function

  public static displayName = 'Form'

  public static className = 'ui-form'

  public static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /**
     *  Form content for childrenApi
     *  @docSiteIgnore
     */
    children: PropTypes.node,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** The columns of the grid with a space-separated list of values. The values represent the track size, and the space between them represents the grid line. */
    columns: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /** Shorthand array of props for the Form.Fields inside the Form. */
    fields: customPropTypes.collectionShorthand,

    /**
     * A custom render iterator for rendering each of the Form fields.
     * The default component, props, and children are available for each item.
     *
     * @param {React.ReactType} Component - The computed component for this slot.
     * @param {object} props - The computed props for this slot.
     * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
     */
    renderField: PropTypes.func,

    /** The rows of the grid with a space-separated list of values. The values represent the track size, and the space between them represents the grid line. */
    rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * The HTML form submit handler.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onSubmit: PropTypes.func,

    /** The HTML form action. */
    action: PropTypes.string,

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  public static defaultProps = {
    as: 'form',
  }

  static Field = FormField

  handleSubmit = (e, ...args) => {
    const { action } = this.props

    // Heads up! Third party libs can pass own data as first argument, we need to check that it has preventDefault()
    // method.
    if (typeof action !== 'string') _.invoke(e, 'preventDefault')
    _.invoke(this.props, 'onSubmit', e, this.props, ...args)
  }

  renderFields = () => {
    const { fields, renderField } = this.props
    return _.map(fields, field =>
      FormField.create(field, {
        render: renderField,
      }),
    )
  }

  public renderComponent({
    ElementType,
    classes,
    accessibility,
    variables,
    styles,
    rest,
  }): React.ReactNode {
    const { as, rows, columns, action, children } = this.props
    return (
      <Grid
        className={classes.root}
        as={as}
        columns={columns}
        rows={rows}
        action={action}
        onSubmit={this.handleSubmit}
        {...rest}
      >
        {childrenExist(children) ? children : this.renderFields()}
      </Grid>
    )
  }
}

export default Form
