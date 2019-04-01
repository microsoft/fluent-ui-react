import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as React from 'react'
import * as PropTypes from 'prop-types'
import cx from 'classnames'
import * as _ from 'lodash'

import {
  AutoControlledComponent,
  RenderResultConfig,
  partitionHTMLProps,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  handleRef,
} from '../../lib'
import { Accessibility } from '../../lib/accessibility/types'
import { defaultBehavior } from '../../lib/accessibility'
import { ReactProps, ShorthandValue, ComponentEventHandler } from '../../types'
import Icon from '../Icon/Icon'
import Ref from '../Ref/Ref'
import Box from '../Box/Box'

export interface InputSlotClassNames {
  input: string
}

export interface InputProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default defaultBehavior
   */
  accessibility?: Accessibility

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

  /** The HTML input type. */
  type?: string

  /** Ref for input DOM node. */
  inputRef?: React.Ref<HTMLElement>

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
class Input extends AutoControlledComponent<ReactProps<InputProps>, InputState> {
  private inputRef = React.createRef<HTMLElement>()

  static className = 'ui-input'

  static displayName = 'Input'

  static slotClassNames: InputSlotClassNames

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
    inputRef: customPropTypes.ref,
    inline: PropTypes.bool,
    onChange: PropTypes.func,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    wrapper: customPropTypes.wrapperShorthand,
  }

  static defaultProps = {
    accessibility: defaultBehavior,
    type: 'text',
    wrapper: {},
    iconPosition: 'end',
  }

  static autoControlledProps = ['value']

  renderComponent({
    accessibility,
    ElementType,
    unhandledProps,
    styles,
    variables,
  }: RenderResultConfig<InputProps>) {
    const { className, input, inputRef, type, wrapper } = this.props
    const { value = '' } = this.state
    const [htmlInputProps, restProps] = partitionHTMLProps(unhandledProps)

    return Box.create(wrapper, {
      defaultProps: {
        ...accessibility.attributes.root,
        className: cx(Input.className, className),
        children: (
          <>
            <Ref
              innerRef={(inputElement: HTMLElement) => {
                handleRef(this.inputRef, inputElement)
                handleRef(inputRef, inputElement)
              }}
            >
              {Box.create(input || type, {
                defaultProps: {
                  ...htmlInputProps,
                  as: 'input',
                  type,
                  value,
                  className: Input.slotClassNames.input,
                  styles: styles.input,
                  onChange: this.handleChange,
                },
              })}
            </Ref>
            {Icon.create(this.computeIcon(), {
              defaultProps: {
                styles: styles.icon,
                variables: variables.icon,
              },
              overrideProps: this.handleIconOverrides,
            })}
          </>
        ),
        styles: styles.root,
        ...restProps,
      },
      overrideProps: {
        as: (wrapper && (wrapper as any).as) || ElementType,
      },
    })
  }

  private handleIconOverrides = predefinedProps => ({
    onClick: (e: React.SyntheticEvent) => {
      this.handleOnClear(e)
      this.inputRef.current.focus()
      _.invoke(predefinedProps, 'onClick', e, this.props)
    },
    ...(predefinedProps.onClick && { tabIndex: '0' }),
  })

  private handleChange = (e: React.SyntheticEvent) => {
    const value = _.get(e, 'target.value')

    _.invoke(this.props, 'onChange', e, { ...this.props, value })

    this.trySetState({ value })
  }

  private handleOnClear = (e: React.SyntheticEvent) => {
    if (this.props.clearable) {
      _.invoke(this.props, 'onChange', e, { ...this.props, value: '' })
      this.trySetState({ value: '' })
    }
  }

  private computeIcon = (): ShorthandValue => {
    const { clearable, icon } = this.props
    const { value } = this.state

    if (clearable && (value as string).length !== 0) {
      return 'stardust-close'
    }

    return icon || null
  }
}

Input.slotClassNames = {
  input: `${Input.className}__input`,
}

export default Input
