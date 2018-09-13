import * as React from 'react'
import * as PropTypes from 'prop-types'
import whatInput from 'what-input'
import * as _ from 'lodash'

import { customPropTypes, AutoControlledComponent, createShorthandFactory } from '../../lib'
import Label from '../Label'
import { ComponentEventHandler, Extendable, ReactChildren } from '../../../types/utils'
import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'
import Icon from '../Icon/Icon'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/interfaces'
import { RadioBehavior } from '../../lib/accessibility'

export interface IRadioProps {
  accessibility?: Accessibility
  as?: any
  checked?: boolean
  children?: ReactChildren
  className?: string
  disabled?: boolean
  label?: string
  name?: string
  onChange?: ComponentEventHandler<IRadioProps>
  type?: string
  styles?: IComponentPartStylesInput
  value?: string | number
  variables?: ComponentVariablesInput
  isFromKeyboard?: boolean
}

/**
 * @accessibility
 * Radio buttons do not handle accessibility. Those aspects will be handled once the RadioGroup component is introduced.
 */
class Radio extends AutoControlledComponent<Extendable<IRadioProps>, any> {
  static create: Function

  static displayName = 'Radio'

  static className = 'ui-radio'

  static propTypes = {
    as: customPropTypes.as,

    /** Whether or not radio is checked. */
    checked: PropTypes.bool,

    /** Child content * */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Initial checked value. */
    defaultChecked: PropTypes.bool,

    /** A radio can appear disabled and be unable to change states. */
    disabled: PropTypes.bool,

    /** The label of the radio input. */
    label: PropTypes.string,

    /** The HTML input name. */
    name: PropTypes.string,

    /**
     * Called after radio is clicked.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onChange: PropTypes.func,

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** The HTML input type. */
    type: PropTypes.string,

    /** The HTML input value. */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    isFromKeyboard: PropTypes.bool,
    defaultIsFromKeyboard: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  }

  static handledProps = [
    'accessibility',
    'as',
    'checked',
    'children',
    'className',
    'defaultChecked',
    'disabled',
    'label',
    'name',
    'onChange',
    'styles',
    'type',
    'value',
    'variables',
    'isFromKeyboard',
    'defautIsFromKeyboard',
    'onFocus',
    'onBlur',
  ]

  static defaultProps = {
    as: 'div',
    type: 'radio',
    accessibility: RadioBehavior as Accessibility,
  }

  static autoControlledProps = ['checked', 'isFromKeyboard']

  private select = (e: React.SyntheticEvent) => {
    const { onChange, disabled } = this.props
    const checked = true

    if (disabled) {
      e.preventDefault()
      return
    }

    this.trySetState({ checked })

    if (onChange) {
      onChange(e, { ...this.props, checked })
    }
  }

  private handleFocus = (e: React.SyntheticEvent) => {
    const isFromKeyboard = whatInput.ask() === 'keyboard'

    this.setState({ isFromKeyboard })

    _.invoke(this.props, 'onFocus', e, this.props)
  }

  private handleBlur = (e: React.SyntheticEvent) => {
    const isFromKeyboard = false

    this.setState({ isFromKeyboard })

    _.invoke(this.props, 'onBlur', e, this.props)
  }

  elementRef: HTMLInputElement
  setElementRef = ref => (this.elementRef = ref)

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.checked && this.state.checked) {
      this.elementRef.focus()
    }
  }

  renderComponent({ ElementType, classes, rest, styles, variables, accessibility }) {
    const { type, label, disabled, value, name, icon } = this.props
    const { checked } = this.state

    return (
      <ElementType
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onClick={this.select}
        {...accessibility.attributes.root}
        {...accessibility.keyHandlers.root}
        {...rest}
        className={classes.root}
        ref={this.setElementRef}
      >
        <Label styles={{ root: styles.label }} {...accessibility.attributes.label}>
          {Icon.create(icon || '', {
            defaultProps: {
              circular: true,
              size: 'mini',
              variables: {
                color: checked ? variables.checkedIconColor : variables.uncheckedIconColor,
                backgroundColor: checked
                  ? variables.checkedIconBackgroundColor
                  : variables.uncheckedIconBackgroundColor,
                borderColor: checked
                  ? variables.checkedIconBorderColor
                  : variables.uncheckedIconBorderColor,
              },
              styles: { root: styles.icon },
            },
          })}
          {label}
        </Label>
      </ElementType>
    )
  }
}

Radio.create = createShorthandFactory(Radio, label => ({ label }))

export default Radio
