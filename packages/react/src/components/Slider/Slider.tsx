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
import { Accessibility } from '../../lib/accessibility/types'
import { sliderBehavior } from '../../lib/accessibility'
import { HtmlInputProps, SupportedIntrinsicInputProps } from '../../lib/htmlPropsUtils'
import Box from '../Box/Box'

const processInputValues = (
  p: Pick<SliderProps, 'min' | 'max'> & Pick<SliderState, 'value'>,
): { min: number; max: number; value: number; valueAsPercentage: string } => {
  let min = _.toNumber(p.min)
  let max = _.toNumber(p.max)
  let value = _.toNumber(p.value)

  if (isNaN(min)) min = Number(Slider.defaultProps.min)
  if (isNaN(max)) max = Number(Slider.defaultProps.max)
  value = isNaN(value) ? min + (max - min) / 2 : Math.min(max, Math.max(min, value))
  const valueAsPercentage = `${(100 * (value - min)) / (max - min)}%`

  return { min, max, value, valueAsPercentage }
}

export interface SliderSlotClassNames {
  input: string
  inputWrapper: string
  rail: string
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
  defaultValue?: string | number

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

  /** Shorthand for the input component. */
  input?: ShorthandValue<HtmlInputProps>

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
  onChange?: ComponentEventHandler<SliderProps & { value: string }>

  /**
   * A number that specifies the granularity that the value must adhere to, or the special value 'any'.
   * A string value of any means that no stepping is implied, and any value is allowed
   * (barring other constraints, such as min and max).
   * @default 1
   */
  step?: SupportedIntrinsicInputProps['step']

  /** The value of the slider. */
  value?: string | number

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
    max: 100,
    min: 0,
    step: 1,
  }

  static autoControlledProps = ['value']

  getInitialAutoControlledState(): Partial<SliderState> {
    return { value: 50 }
  }

  handleInputOverrides = () => ({
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = _.get(e, 'target.value')
      _.invoke(this.props, 'onChange', e, { ...this.props, value })
      this.trySetState({ value })
    },
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
      this.setState({ isFromKeyboard: isFromKeyboard() })
      _.invoke(this.props, 'onFocus', e, this.props)
    },
    onMouseDown: (e: React.MouseEvent<HTMLInputElement>) => {
      setWhatInputSource('mouse')
      this.setState({ isFromKeyboard: false })
      _.invoke(this.props, 'onMouseDown', e, this.props)
    },
  })

  renderComponent({
    ElementType,
    classes,
    accessibility,
    rtl,
    styles,
    unhandledProps,
  }: RenderResultConfig<SliderProps>) {
    const { input, inputRef, step } = this.props
    const [htmlInputProps, restProps] = partitionHTMLProps(unhandledProps)
    const type = 'range'

    const { min, max, value, valueAsPercentage } = processInputValues({
      min: this.props.min,
      max: this.props.max,
      value: this.state.value || '',
    })

    // we need 2 wrappers around the slider rail, track, input and thumb slots to achieve correct component sizes
    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...restProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        <div className={cx(Slider.slotClassNames.inputWrapper, classes.inputWrapper)}>
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
                styles: styles.input,
                ...applyAccessibilityKeyHandlers(accessibility.keyHandlers.input, htmlInputProps),
              },
              overrideProps: this.handleInputOverrides,
            })}
          </Ref>
          {/* the thumb slot needs to appear after the input slot */}
          <span
            className={cx(Slider.slotClassNames.thumb, classes.thumb)}
            style={{ [rtl ? 'right' : 'left']: valueAsPercentage }}
          />
        </div>
      </ElementType>
    )
  }
}

Slider.slotClassNames = {
  input: `${Slider.className}__input`,
  inputWrapper: `${Slider.className}__input-wrapper`,
  rail: `${Slider.className}__rail`,
  thumb: `${Slider.className}__thumb`,
  track: `${Slider.className}__track`,
}

/**
 * A slider is an input that allows the user to choose a value from within a specific range of values.
 * @accessibility
 * Implements [ARIA Slider](https://www.w3.org/TR/wai-aria-practices-1.1/#slider) design pattern.
 */
export default withSafeTypeForAs<typeof Slider, SliderProps, 'input'>(Slider)
