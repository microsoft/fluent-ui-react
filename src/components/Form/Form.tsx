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
} from '../../../types/utils'
import { Sizes } from '../../lib/enums'
import Grid from '../Grid/Grid'
import FormField from './FormField'
import { SizeContext } from './SizeContext'

export interface IFormProps {
  action?: string
  as?: any
  children?: ReactChildren
  className?: string
  onSubmit?: ComponentEventHandler<IFormProps>
  columns?: string | number
  content?: ShorthandValue | ShorthandValue[]
  rows?: string | number
  size?: Sizes
  loading?: boolean
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
     *  Button content for childrenApi
     *  @docSiteIgnore
     */
    children: PropTypes.node,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** The columns of the grid with a space-separated list of values. The values represent the track size, and the space between them represents the grid line. */
    columns: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /** Shorthand for primary content. */
    content: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.oneOfType([
        PropTypes.arrayOf(customPropTypes.itemShorthand),
        customPropTypes.itemShorthand,
      ]),
    ]),

    /** The rows of the grid with a space-separated list of values. The values represent the track size, and the space between them represents the grid line. */
    rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * The HTML form submit handler.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onSubmit: PropTypes.func,

    /** Automatically show a loading indicator. */
    loading: PropTypes.bool,

    /** The HTML form action. */
    action: PropTypes.string,

    /** The size for the Text component */
    size: PropTypes.oneOf(['smallest', 'smaller', 'small', 'medium', 'large', 'larger', 'largest']),

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

  public renderComponent({
    ElementType,
    classes,
    accessibility,
    variables,
    styles,
    rest,
  }): React.ReactNode {
    const { as, rows, columns, action, children, content, size } = this.props
    return (
      <SizeContext.Provider value={{ size }}>
        <Grid
          className={classes.root}
          as={as}
          columns={columns}
          rows={rows}
          action={action}
          onSubmit={this.handleSubmit}
          {...rest}
        >
          {childrenExist(children) ? children : content}
        </Grid>
      </SizeContext.Provider>
    )
  }
}

export default Form
