import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as cx from 'classnames'
import * as _ from 'lodash'

import {
  AutoControlledComponent,
  customPropTypes,
  RenderResultConfig,
  partitionHTMLProps,
} from '../../lib'
import {
  Extendable,
  ReactChildren,
  ShorthandValue,
  ShorthandRenderFunction,
  ComponentEventHandler,
} from '../../../types/utils'
import { ComponentSlotStyle, ComponentVariablesInput } from '../../themes/types'
import Icon from '../Icon/Icon'
import Slot from '../Slot/Slot'
import Ref from '../Ref/Ref'

export interface InputProps {
  as?: any
  children?: ReactChildren
  className?: string
  clearable?: boolean
  defaultValue?: React.ReactText
  fluid?: boolean
  icon?: ShorthandValue
  inline?: boolean
  input?: ShorthandValue
  onChange?: ComponentEventHandler<InputProps>
  renderIcon?: ShorthandRenderFunction
  renderInput?: ShorthandRenderFunction
  renderWrapper?: ShorthandRenderFunction
  css?: ComponentSlotStyle<InputProps, any>
  type?: string
  inputRef?: (node: HTMLElement) => void
  value?: React.ReactText
  variables?: ComponentVariablesInput
  wrapper?: ShorthandValue
}

export interface InputState {
  value?: React.ReactText
}

/**
 * An input is a field used to elicit a response from a user.
 * @accessibility
 * For good screen reader experience set aria-label or aria-labelledby attribute for input.
 *
 * Other considerations:
 *  - if input is search, then use "role='search'"
 */
class Input extends AutoControlledComponent<Extendable<InputProps>, InputState> {
  private inputDomElement: HTMLInputElement

  static className = 'ui-input'

  static displayName = 'Input'

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /**
     *  Used to set content when using childrenApi - internal only
     *  @docSiteIgnore
     */
    children: PropTypes.node,

    /** Additional CSS class name(s) to apply. */
    className: PropTypes.string,

    /** A property that will change the icon on the input and clear the input on click on Cancel. */
    clearable: PropTypes.bool,

    /** The default value of the input. */
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /** An input can take the width of its container. */
    fluid: PropTypes.bool,

    /** Optional Icon to display inside the Input. */
    icon: customPropTypes.itemShorthand,

    /** Shorthand for the input component. */
    input: customPropTypes.itemShorthand,

    /**
     * Ref callback with an input DOM node.
     *
     * @param {JSX.Element} node - input DOM node.
     */
    inputRef: PropTypes.func,

    /** An input can be used inline with text. */
    inline: PropTypes.bool,

    /**
     * Called on change.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and proposed value.
     */
    onChange: PropTypes.func,

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

    /** Additional CSS styles to apply to the component instance. */
    css: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** The HTML input type. */
    type: PropTypes.string,

    /** The value of the input. */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Shorthand for the wrapper component. */
    wrapper: customPropTypes.wrapperShorthand,
  }

  static defaultProps = {
    as: 'div',
    type: 'text',
    wrapper: 'div',
  }

  static autoControlledProps = ['value']

  renderComponent({
    ElementType,
    classes,
    rest: restProps,
    css,
    variables,
  }: RenderResultConfig<InputProps>) {
    const { className, input, renderIcon, renderInput, renderWrapper, type, wrapper } = this.props
    const { value = '' } = this.state
    const [htmlInputProps, rest] = partitionHTMLProps(restProps)

    return Slot.create(wrapper, {
      defaultProps: {
        as: ElementType,
        className: cx(Input.className, className),
        children: (
          <>
            <Ref innerRef={this.handleInputRef}>
              {Slot.createHTMLInput(input || type, {
                defaultProps: {
                  ...htmlInputProps,
                  type,
                  value,
                  className: classes.input,
                  onChange: this.handleChange,
                },
                render: renderInput,
              })}
            </Ref>
            {Icon.create(this.computeIcon(), {
              defaultProps: {
                css: css.icon,
                variables: variables.icon,
              },
              overrideProps: this.handleIconOverrides,
              render: renderIcon,
            })}
          </>
        ),
        css: css.root,
        ...rest,
      },
      render: renderWrapper,
    })
  }

  private handleInputRef = (inputNode: HTMLElement) => {
    this.inputDomElement = inputNode as HTMLInputElement

    _.invoke(this.props, 'inputRef', inputNode)
  }

  private handleIconOverrides = predefinedProps => ({
    onClick: (e: React.SyntheticEvent) => {
      this.handleOnClear()
      this.inputDomElement.focus()
      _.invoke(predefinedProps, 'onClick', e, this.props)
    },
    ...(predefinedProps.onClick && { tabIndex: '0' }),
  })

  private handleChange = (e: React.SyntheticEvent) => {
    const value = _.get(e, 'target.value')

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
