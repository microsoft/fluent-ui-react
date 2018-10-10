import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import {
  AutoControlledComponent,
  createHTMLInput,
  customPropTypes,
  getUnhandledProps,
  partitionHTMLProps,
} from '../../lib'
import Icon from '../Icon'
import { ComponentVariablesInput, ComponentPartStyle } from '../../../types/theme'
import {
  ComponentEventHandler,
  Extendable,
  ReactChildren,
  ShorthandRenderFunction,
  ShorthandValue,
} from '../../../types/utils'

export interface IInputProps {
  as?: any
  children?: ReactChildren
  className?: string
  clearable?: boolean
  defaultValue?: string | number
  fluid?: boolean
  icon?: ShorthandValue
  inline?: boolean
  input?: ShorthandValue
  onChange?: ComponentEventHandler<IInputProps>
  value?: string | number
  type?: string
  renderIcon?: ShorthandRenderFunction
  renderInput?: ShorthandRenderFunction
  styles?: ComponentPartStyle
  variables?: ComponentVariablesInput
}

/**
 * An Input
 * @accessibility
 * For good screen reader experience set aria-label or aria-labelledby attribute for input.
 *
 *
 * Other considerations:
 *  - if input is search, then use "role='search'"
 *
 */
class Input extends AutoControlledComponent<Extendable<IInputProps>, any> {
  static className = 'ui-input'

  static displayName = 'Input'

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** A property that will change the icon on the input and clear the input on click on Cancel */
    clearable: PropTypes.bool,

    /** The default value of the input. */
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /** An input can take the width of its container. */
    fluid: PropTypes.bool,

    /** Optional Icon to display inside the Input. */
    icon: customPropTypes.itemShorthand,

    /** An input can be used inline with text */
    inline: PropTypes.bool,

    /**
     * Called on change.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and proposed value.
     */
    onChange: PropTypes.func,

    /** The HTML input type. */
    type: PropTypes.string,

    /**
     * A custom render function the icon slot.
     *
     * @param {React.ReactType} Component - The computed component for this slot.
     * @param {object} props - The computed props for this slot.
     * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
     */
    renderIcon: PropTypes.func,

    /**
     * A custom render function the input slot.
     *
     * @param {React.ReactType} Component - The computed component for this slot.
     * @param {object} props - The computed props for this slot.
     * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
     */
    renderInput: PropTypes.func,

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** The value of the input. */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    as: 'div',
    type: 'text',
  }

  static autoControlledProps = ['value']

  inputRef: any

  state: any = { value: this.props.value || this.props.defaultValue || '' }

  handleChange = e => {
    const value = _.get(e, 'target.value')

    _.invoke(this.props, 'onChange', e, { ...this.props, value })

    this.trySetState({ value })
  }

  handleChildOverrides = (child, defaultProps) => ({
    ...defaultProps,
    ...child.props,
  })

  handleInputRef = c => (this.inputRef = c)

  handleOnClear = e => {
    const { clearable } = this.props

    if (clearable) {
      this.trySetState({ value: '' })
    }
  }

  partitionProps = () => {
    const { type } = this.props
    const { value } = this.state

    const unhandled = getUnhandledProps(Input, this.props)
    const [htmlInputProps, rest] = partitionHTMLProps(unhandled)

    return [
      {
        ...htmlInputProps,
        onChange: this.handleChange,
        type,
        value: value || '',
      },
      rest,
    ]
  }

  computeIcon = () => {
    const { clearable, icon } = this.props
    const { value } = this.state

    if (clearable && value.length !== 0) {
      return 'close'
    }

    if (!_.isNil(icon)) return icon

    return null
  }

  handleIconOverrides = predefinedProps => {
    return {
      onClick: e => {
        this.handleOnClear(e)

        this.inputRef.focus()
        _.invoke(predefinedProps, 'onClick', e, this.props)
      },
      ...(predefinedProps.onClick && { tabIndex: '0' }),
    }
  }

  renderComponent({ ElementType, classes, styles, variables }) {
    const { renderIcon, renderInput, type } = this.props
    const [htmlInputProps, restProps] = this.partitionProps()

    const inputClasses = classes.input

    return (
      <ElementType className={classes.root} {...restProps}>
        {createHTMLInput(type, {
          defaultProps: htmlInputProps,
          overrideProps: {
            className: inputClasses,
            ref: this.handleInputRef,
          },
          render: renderInput,
        })}
        {this.computeIcon() &&
          Icon.create(this.computeIcon(), {
            defaultProps: {
              styles: styles.icon,
              variables: variables.icon,
            },
            overrideProps: this.handleIconOverrides,
            render: renderIcon,
          })}
      </ElementType>
    )
  }
}

export default Input
