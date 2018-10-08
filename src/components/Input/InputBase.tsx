import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import { AutoControlledComponent, customPropTypes, createShorthandFactory } from '../../lib'
import { ComponentVariablesInput, ComponentPartStyle } from '../../../types/theme'
import { Extendable, ComponentEventHandler } from '../../../types/utils'

export interface IInputBaseProps {
  as?: any
  className?: string
  defaultValue?: React.ReactText
  fluid?: boolean
  onChange?: ComponentEventHandler<IInputBaseProps>
  placeholder?: string
  type?: string
  styles?: ComponentPartStyle<IInputBaseProps, any>
  value?: React.ReactText
  variables?: ComponentVariablesInput
}

export interface IInputState {
  value?: React.ReactText
}

/**
 * A basic Input
 * @accessibility
 * For good screen reader experience set aria-label or aria-labelledby attribute for input.
 */
class InputBase extends AutoControlledComponent<Extendable<IInputBaseProps>, IInputState> {
  static create: Function

  static className = 'ui-input__base'

  static displayName = 'InputBase'

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** The default value of the input. */
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /** An input can take the width of its container. */
    fluid: PropTypes.bool,

    /**
     * Called on change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and proposed value.
     */
    onChange: PropTypes.func,

    /** The HTML input placeholder. */
    placeholder: PropTypes.string,

    /** The HTML input type. */
    type: PropTypes.string,

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** The value of the input. */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    as: 'input',
    type: 'text',
  }

  static autoControlledProps = ['value']

  state = { value: this.props.value || this.props.defaultValue || '' }

  renderComponent({ ElementType, classes, rest }) {
    const { placeholder, type } = this.props

    return (
      <ElementType
        className={classes.root}
        onChange={this.handleChange}
        placeholder={placeholder}
        type={type}
        value={this.state.value}
        {...rest}
      />
    )
  }

  private handleChange = (e: React.SyntheticEvent) => {
    const value = _.get(e, 'target.value')

    _.invoke(this.props, 'onChange', e, { ...this.props, value })

    this.trySetState({ value })
  }
}

InputBase.create = createShorthandFactory(InputBase, type => ({ type }))

export default InputBase
