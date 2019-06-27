import * as React from 'react'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import { handleRef, Ref } from '@stardust-ui/react-component-ref'
import * as customPropTypes from '@stardust-ui/react-proptypes'

import {
  applyAccessibilityKeyHandlers,
  AutoControlledComponent,
  ChildrenComponentProps,
  commonPropTypes,
  isFromKeyboard,
  partitionHTMLProps,
  UIComponentProps,
  RenderResultConfig,
} from '../../lib'
import { ComponentEventHandler, ShorthandValue, WithAsProp, withSafeTypeForAs } from '../../types'
import { ComponentVariablesObject, ComponentSlotStylesPrepared } from '../../themes/types'
import { Accessibility } from '../../lib/accessibility/types'
import { sliderBehavior } from '../../lib/accessibility'
import { SupportedIntrinsicInputProps } from '../../lib/htmlPropsUtils'
import Box from '../Box/Box'
import Icon from '../Icon/Icon'

export interface SliderSlotClassNames {
  input: string
}

export interface SliderProps
  extends UIComponentProps,
    ChildrenComponentProps,
    SupportedIntrinsicInputProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default sliderBehavior
   */
  accessibility?: Accessibility

  /** The default value of the slider. */
  defaultValue?: SupportedIntrinsicInputProps['defaultValue'] // TODO 'value' type is React.ReactText but it doesn't work for 'defaultValue'

  /**
   * A slider can be read-only and unable to change states.
   * @default false
   */
  disabled?: SupportedIntrinsicInputProps['disabled']

  /**
   * A slider can take the width of its container.
   * @default false
   */
  fluid?: boolean

  /**
   * Callback that creates custom accessibility message a screen reader narrates when the value changes.
   * @param {SliderProps} props - Slider props.
   */
  getA11yValueMessageOnChange?: (props: SliderProps) => string

  /** Optional Icon to display inside the slider. */
  icon?: ShorthandValue

  /** A slider with icon can format the icon to appear at the start or at the end. */
  iconPosition?: 'start' | 'end'

  /** Shorthand for the input component. */
  input?: ShorthandValue

  /** Ref for input DOM node. */
  inputRef?: React.Ref<HTMLElement>

  /**
   * The minimum value of the slider
   * @default 0
   */
  min?: SupportedIntrinsicInputProps['min']

  /**
   * The maximum value of the slider.
   * @default 100
   */
  max?: SupportedIntrinsicInputProps['max']

  /**
   * Called after item checked state is changed.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onChange?: ComponentEventHandler<SliderProps>

  /**
   * A number that specifies the granularity that the value must adhere to, or the special value 'any'.
   * A string value of any means that no stepping is implied, and any value is allowed
   * (barring other constraints, such as min and max).
   * @default 1
   */
  step?: SupportedIntrinsicInputProps['step']

  /** The value of the slider. */
  value?: React.ReactText

  /**
   * A slider can be displayed vertically.
   * @default false
   */
  vertical?: boolean
}

export interface SliderState {
  value: SliderProps['value']
  isFromKeyboard: boolean
}

class Slider extends AutoControlledComponent<WithAsProp<SliderProps>, SliderState> {
  inputRef = React.createRef<HTMLElement>()

  static displayName = 'Slider'

  static className = 'ui-slider'

  static slotClassNames: SliderSlotClassNames

  static propTypes = {
    ...commonPropTypes.createCommon({ content: false }),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fluid: PropTypes.bool,
    getA11yValueMessageOnChange: PropTypes.func,
    icon: customPropTypes.itemShorthand,
    iconPosition: PropTypes.oneOf(['start', 'end']),
    input: customPropTypes.itemShorthand,
    inputRef: customPropTypes.ref,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    vertical: PropTypes.bool,
  }

  static defaultProps: SliderProps = {
    accessibility: sliderBehavior,
    defaultValue: '50',
    iconPosition: 'start',
    min: 0,
    max: 100,
    step: 1,
    type: 'range',
    getA11yValueMessageOnChange: ({ value }) => String(value),
  }

  static autoControlledProps = ['value']

  getInitialAutoControlledState(): SliderState {
    return { value: undefined, isFromKeyboard: false }
  }

  handleChange = (e: React.ChangeEvent) => {
    const value = _.get(e, 'target.value')
    _.invoke(this.props, 'onChange', e, { ...this.props, value })
    this.trySetState({ value })
  }

  handleFocus = (e: React.FocusEvent) => {
    this.setState({ isFromKeyboard: isFromKeyboard() })
    _.invoke(this.props, 'onFocus', e, this.props)
  }

  renderIcon = (variables: ComponentVariablesObject, styles: ComponentSlotStylesPrepared) => {
    const { icon } = this.props

    return Icon.create(icon, {
      defaultProps: {
        styles: styles.icon,
        variables: variables.icon,
      },
    })
  }

  renderComponent({
    ElementType,
    classes,
    accessibility,
    variables,
    styles,
    unhandledProps,
  }: RenderResultConfig<SliderProps>) {
    const { iconPosition, input, inputRef, type } = this.props
    const { value } = this.state
    const [htmlInputProps, restProps] = partitionHTMLProps(unhandledProps)

    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...restProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        {iconPosition === 'start' && this.renderIcon(variables, styles)}
        <div className={classes.inputWrapper}>
          <Ref
            innerRef={(inputElement: HTMLElement) => {
              handleRef(this.inputRef, inputElement)
              handleRef(inputRef, inputElement)
            }}
          >
            {Box.create(input || type, {
              defaultProps: {
                ...htmlInputProps,
                ...accessibility.attributes.input,
                className: Slider.slotClassNames.input,
                as: 'input',
                type,
                value,
                onChange: this.handleChange,
                onFocus: this.handleFocus,
                styles: styles.input,
                ...applyAccessibilityKeyHandlers(accessibility.keyHandlers.input, htmlInputProps),
              },
            })}
          </Ref>
        </div>
        {iconPosition !== 'start' && this.renderIcon(variables, styles)}
      </ElementType>
    )
  }
}

Slider.slotClassNames = {
  input: `${Slider.className}__input`,
}

/**
 * A slider is an input that allows the user to choose a value from within a specific range of values.
 * Sliders typically have a slider thumb that can be moved along a bar or track to change the value of the slider.
 * @accessibility
 * Implements [ARIA Slider](https://www.w3.org/TR/wai-aria-practices-1.1/#slider) design pattern.
 */
export default withSafeTypeForAs<typeof Slider, SliderProps, 'input'>(Slider)
