import * as React from 'react'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as customPropTypes from '@stardust-ui/react-proptypes'
import { handleRef, Ref } from '@stardust-ui/react-component-ref'
import cx from 'classnames'

import {
  applyAccessibilityKeyHandlers,
  AutoControlledComponent,
  ChildrenComponentProps,
  commonPropTypes,
  isFromKeyboard,
  partitionHTMLProps,
  UIComponentProps,
  RenderResultConfig,
  setWhatInputSource,
} from '../../lib'
import {
  ComponentEventHandler,
  ShorthandValue,
  WithAsProp,
  withSafeTypeForAs,
  Omit,
} from '../../types'
import { ComponentVariablesObject, ComponentSlotStylesPrepared } from '../../themes/types'
import { Accessibility } from '../../lib/accessibility/types'
import { sliderBehavior } from '../../lib/accessibility'
import { SupportedIntrinsicInputProps } from '../../lib/htmlPropsUtils'
import Box from '../Box/Box'
import Icon from '../Icon/Icon'

const defaultPropValues = {
  max: 100,
  min: 0,
  step: 1,
  value: 50,
}

const processInputValues = (
  p: Pick<SliderProps, 'min' | 'max'> & Pick<SliderState, 'value'>,
): { min: number; max: number; value: number; valueAsPercentage: string } => {
  let min = _.toNumber(p.min)
  let max = _.toNumber(p.max)
  let value = _.toNumber(p.value)

  if (isNaN(min)) min = defaultPropValues.min
  if (isNaN(max)) max = defaultPropValues.max
  value = isNaN(value) ? defaultPropValues.value : Math.min(max, Math.max(min, value))
  const valueAsPercentage = `${(100 * (value - min)) / (max - min)}%`

  return { min, max, value, valueAsPercentage }
}

export interface SliderSlotClassNames {
  input: string
  rail: string
  slider: string
  sliderWrapper: string
  thumb: string
  track: string
}

export interface SliderProps
  extends UIComponentProps,
    ChildrenComponentProps,
    Omit<SupportedIntrinsicInputProps, 'defaultValue'> {
  /**
   * Accessibility behavior if overridden by the user.
   * @default sliderBehavior
   */
  accessibility?: Accessibility

  /** The default value of the slider. */
  defaultValue?: React.ReactText

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
   * The maximum value of the slider.
   * @default 100
   */
  max?: SupportedIntrinsicInputProps['max']

  /**
   * The minimum value of the slider
   * @default 0
   */
  min?: SupportedIntrinsicInputProps['min']

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
    max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    vertical: PropTypes.bool,
  }

  static defaultProps: SliderProps = {
    accessibility: sliderBehavior,
    getA11yValueMessageOnChange: ({ value }) => String(value),
    iconPosition: 'start',
    max: defaultPropValues.max,
    min: defaultPropValues.min,
    step: defaultPropValues.step,
  }

  static autoControlledProps = ['value']

  getInitialAutoControlledState(): Partial<SliderState> {
    return { value: defaultPropValues.value }
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

  handleMouseDown = (e: React.FocusEvent) => {
    setWhatInputSource('mouse')
    this.setState({ isFromKeyboard: false })
    _.invoke(this.props, 'onMouseDown', e, this.props)
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
    const { iconPosition, input, inputRef, step } = this.props
    const [htmlInputProps, restProps] = partitionHTMLProps(unhandledProps)
    const type = 'range'

    const { min, max, value, valueAsPercentage } = processInputValues({
      min: this.props.min,
      max: this.props.max,
      value: this.state.value || '',
    })

    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...restProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        {iconPosition === 'start' && this.renderIcon(variables, styles)}
        {/* we need 2 wrappers around the slider rail, track, input and thumb slots to achieve correct component sizes */}
        <div className={cx(Slider.slotClassNames.sliderWrapper, classes.sliderWrapper)}>
          <div className={cx(Slider.slotClassNames.slider, classes.slider)}>
            <span className={cx(Slider.slotClassNames.rail, classes.rail)} />
            <span
              className={cx(Slider.slotClassNames.track, classes.track)}
              style={{ width: valueAsPercentage }}
            />
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
                  min,
                  max,
                  step,
                  type,
                  value,
                  onChange: this.handleChange,
                  onFocus: this.handleFocus,
                  onMouseDown: this.handleMouseDown,
                  styles: styles.input,
                  ...applyAccessibilityKeyHandlers(accessibility.keyHandlers.input, htmlInputProps),
                },
              })}
            </Ref>
            {/* the thumb slot needs to appear after the input slot */}
            <span
              className={cx(Slider.slotClassNames.thumb, classes.thumb)}
              style={{ left: valueAsPercentage }}
            />
          </div>
        </div>
        {iconPosition !== 'start' && this.renderIcon(variables, styles)}
      </ElementType>
    )
  }
}

Slider.slotClassNames = {
  input: `${Slider.className}__input`,
  rail: `${Slider.className}__rail`,
  slider: `${Slider.className}__slider`,
  sliderWrapper: `${Slider.className}__slider-wrapper`,
  thumb: `${Slider.className}__thumb`,
  track: `${Slider.className}__track`,
}

/**
 * A slider is an input that allows the user to choose a value from within a specific range of values.
 * @accessibility
 * Implements [ARIA Slider](https://www.w3.org/TR/wai-aria-practices-1.1/#slider) design pattern.
 */
export default withSafeTypeForAs<typeof Slider, SliderProps, 'input'>(Slider)
