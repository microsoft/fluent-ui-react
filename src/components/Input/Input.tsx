import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'

import { AutoControlledComponent, customPropTypes } from '../../lib'
import { Extendable, ShorthandValue, ShorthandRenderFunction } from '../../../types/utils'
import InputBase, { IInputBaseProps } from './InputBase'
import Icon from '../Icon'
import Slot from '../Slot'
import Ref from '../Ref'

export interface IInputProps extends IInputBaseProps {
  clearable?: boolean
  icon?: ShorthandValue
  inline?: boolean
  renderIcon?: ShorthandRenderFunction
  renderInput?: ShorthandRenderFunction
  renderWrapper?: ShorthandRenderFunction
  wrapper?: ShorthandValue
}

export interface IInputState {
  value?: React.ReactText
}

/**
 * An Input
 * @accessibility
 * For good screen reader experience set aria-label or aria-labelledby attribute for input.
 *
 * Other considerations:
 *  - if input is search, then use "role='search'"
 */
class Input extends AutoControlledComponent<Extendable<IInputProps>, IInputState> {
  private inputRef: HTMLInputElement

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

    /** The HTML input placeholder. */
    placeholder: PropTypes.string,

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

    /**
     * A custom render function the wrapper slot.
     *
     * @param { React.ReactType } Component - The computed component for this slot.
     * @param { object } props - The computed props for this slot.
     * @param { ReactNode | ReactNodeArray } children - The computed children for this slot.
     */
    renderWrapper: PropTypes.func,

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** The value of the input. */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Shorthand for the wrapper component */
    wrapper: customPropTypes.itemShorthand,
  }

  static defaultProps = {
    as: 'input',
    type: 'text',
    wrapper: 'div',
  }

  static autoControlledProps = ['value']

  state = { value: this.props.value || this.props.defaultValue || '' }

  renderComponent({ classes, styles, variables }) {
    const {
      clearable,
      icon,
      inline,
      renderIcon,
      renderInput,
      renderWrapper,
      wrapper,
      ...rest
    } = this.props
    const { value } = this.state

    const inputComponent = InputBase.create(this.props.type, {
      defaultProps: { className: classes.input, ...rest, value },
      overrideProps: { onChange: this.handleChange },
      render: renderInput,
    })

    return wrapper
      ? Slot.create(wrapper, {
          defaultProps: { className: classes.root },
          overrideProps: {
            children: (
              <>
                <Ref innerRef={this.handleInputRef}>{inputComponent}</Ref>
                {Icon.create(this.computeIcon(), {
                  defaultProps: {
                    styles: styles.icon,
                    variables: variables.icon,
                  },
                  overrideProps: this.handleIconOverrides,
                  render: renderIcon,
                })}
              </>
            ),
          },
          render: renderWrapper,
        })
      : inputComponent
  }

  private handleInputRef = (c: HTMLInputElement) => (this.inputRef = c)

  private handleIconOverrides = predefinedProps => ({
    onClick: (e: React.SyntheticEvent) => {
      this.handleOnClear()
      this.inputRef.focus()
      _.invoke(predefinedProps, 'onClick', e, this.props)
    },
    ...(predefinedProps.onClick && { tabIndex: '0' }),
  })

  private handleChange = (e: React.SyntheticEvent, { value }: { value: React.ReactText }) => {
    _.invoke(this.props, 'onChange', e, { ...this.props, value })
    this.trySetState({ value })
  }

  private handleOnClear = () => {
    if (this.props.clearable) {
      this.trySetState({ value: '' })
    }
  }

  private computeIcon = (): ShorthandValue => {
    const { clearable, icon } = this.props
    const { value } = this.state

    if (clearable && (value as string).length !== 0) {
      return 'close'
    }

    return icon || null
  }
}

export default Input
