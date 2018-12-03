import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as cx from 'classnames'
import * as _ from 'lodash'

import {
  AutoControlledComponent,
  customPropTypes,
  RenderResultConfig,
  partitionHTMLProps,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
} from '../../lib'
import {
  Extendable,
  ShorthandValue,
  ShorthandRenderFunction,
  ComponentEventHandler,
} from '../../../types/utils'
import Icon from '../Icon/Icon'
import Ref from '../Ref/Ref'
import Slot from '../Slot/Slot'

export interface InputProps extends UIComponentProps, ChildrenComponentProps {
  /** A property that will change the icon on the input and clear the input on click on Cancel. */
  clearable?: boolean

  /** The default value of the input. */
  defaultValue?: React.ReactText

  /** An input can take the width of its container. */
  fluid?: boolean

  /** Optional Icon to display inside the Input. */
  icon?: ShorthandValue

  /** An Input with icon can format the icon to appear at the start or at the end of the input field. */
  iconPosition?: 'start' | 'end'

  /** An input can be used inline with text. */
  inline?: boolean

  /** Shorthand for the input component. */
  input?: ShorthandValue

  /**
   * Called on change.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onChange?: ComponentEventHandler<InputProps>

  /**
   * A custom render function the icon slot.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderIcon?: ShorthandRenderFunction

  /**
   * A custom render function the input slot.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderInput?: ShorthandRenderFunction

  /**
   * A custom render function the wrapper slot.
   *
   * @param { React.ReactType } Component - The computed component for this slot.
   * @param { object } props - The computed props for this slot.
   * @param { ReactNode | ReactNodeArray } children - The computed children for this slot.
   */
  renderWrapper?: ShorthandRenderFunction

  /** The HTML input type. */
  type?: string

  /**
   * Ref callback with an input DOM node.
   *
   * @param {JSX.Element} node - input DOM node.
   */
  inputRef?: (node: HTMLElement) => void

  /** The value of the input. */
  value?: React.ReactText

  /** Shorthand for the wrapper component. */
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
    ...commonPropTypes.createCommon({
      content: false,
    }),
    clearable: PropTypes.bool,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fluid: PropTypes.bool,
    icon: customPropTypes.itemShorthand,
    iconPosition: PropTypes.oneOf(['start', 'end']),
    input: customPropTypes.itemShorthand,
    inputRef: PropTypes.func,
    inline: PropTypes.bool,
    onChange: PropTypes.func,
    renderIcon: PropTypes.func,
    renderInput: PropTypes.func,
    renderWrapper: PropTypes.func,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    wrapper: customPropTypes.wrapperShorthand,
  }

  static defaultProps = {
    type: 'text',
    wrapper: {},
    iconPosition: 'end',
  }

  static autoControlledProps = ['value']

  renderComponent({
    ElementType,
    classes,
    rest: restProps,
    styles,
    variables,
  }: RenderResultConfig<InputProps>) {
    const { className, input, renderIcon, renderInput, renderWrapper, type, wrapper } = this.props
    const { value = '' } = this.state
    const [htmlInputProps, rest] = partitionHTMLProps(restProps)

    return Slot.create(wrapper, {
      defaultProps: {
        className: cx(Input.className, className),
        children: (
          <>
            <Ref innerRef={this.handleInputRef}>
              {Slot.create(input || type, {
                defaultProps: {
                  ...htmlInputProps,
                  as: 'input',
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
                styles: styles.icon,
                variables: variables.icon,
              },
              overrideProps: this.handleIconOverrides,
              render: renderIcon,
            })}
          </>
        ),
        ...rest,

        // do not pass Stardust 'styles' prop
        // in case if React Element was used to define 'wrapper'
        ...(!React.isValidElement(wrapper) && {
          styles: styles.root,
        }),
      },
      overrideProps: {
        as: (wrapper && (wrapper as any).as) || ElementType,
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
