import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import whatInput from 'what-input'

import {
  createHTMLInput,
  customPropTypes,
  AutoControlledComponent,
  createShorthandFactory,
} from '../../lib'
import Label from '../Label'
import {
  ComponentEventHandler,
  Extendable,
  ItemShorthand,
  ReactChildren,
} from '../../../types/utils'
import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'
import Icon from '../Icon/Icon'
import { Accessibility } from '../../lib/accessibility/interfaces'
import { RadioBehavior } from '../../lib/accessibility'

export interface IRadioProps {
  accessibility?: Accessibility
  as?: any
  checked?: boolean
  children?: ReactChildren
  className?: string
  defaultChecked?: boolean
  disabled?: boolean
  icon?: ItemShorthand
  label?: string
  name?: string
  onChange?: ComponentEventHandler<IRadioProps>
  type?: string
  styles?: IComponentPartStylesInput
  value?: string | number
  variables?: ComponentVariablesInput
  isFromKeyboard?: boolean
  vertical?: boolean
}

/**
 * @accessibility
 * Radio buttons need to be grouped in RadioGroup component to correctly handle accessibility.
 */
class Radio extends AutoControlledComponent<Extendable<IRadioProps>, any> {
  static create: Function

  static displayName = 'Radio'

  static className = 'ui-radio'

  static propTypes = {
    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    as: customPropTypes.as,

    /** Whether or not radio is checked. */
    checked: PropTypes.bool,

    /** Child content * */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Initial checked value. */
    defaultChecked: PropTypes.bool,

    /** Default value for isFromKeyboard (autocontrolled). */
    defaultIsFromKeyboard: PropTypes.bool,

    /** A radio can appear disabled and be unable to change states. */
    disabled: PropTypes.bool,

    /** The radio button indicator can be user-defined icon */
    icon: customPropTypes.itemShorthand,

    /** Whether focus came from the keyboard (autocontrolled). */
    isFromKeyboard: PropTypes.bool,

    /** The label of the radio input. */
    label: PropTypes.string,

    /** The HTML input name. */
    name: PropTypes.string,

    /**
     * Called after radio blurs.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onBlur: PropTypes.func,

    /**
     * Called after radio gets focus.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onFocus: PropTypes.func,

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

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** A vertical radio group displays elements vertically. */
    vertical: PropTypes.bool,
  }

  static handledProps = [
    'accessibility',
    'as',
    'checked',
    'children',
    'className',
    'defaultChecked',
    'defaultIsFromKeyboard',
    'disabled',
    'icon',
    'isFromKeyboard',
    'label',
    'name',
    'onBlur',
    'onChange',
    'onFocus',
    'styles',
    'type',
    'value',
    'variables',
    'vertical',
  ]

  static defaultProps = {
    as: 'div',
    type: 'radio',
    accessibility: RadioBehavior as Accessibility,
  }

  static autoControlledProps = ['checked', 'isFromKeyboard']

  elementRef: HTMLElement

  componentDidMount() {
    this.elementRef = ReactDOM.findDOMNode(this) as HTMLElement
  }

  componentDidUpdate(prevProps, prevState) {
    const checked = this.state.checked
    if (checked !== prevState.checked) {
      checked && this.elementRef.focus()
      _.invoke(this.props, 'onChange', undefined, { ...this.props, checked })
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

  handleClick = e => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  renderComponent({ ElementType, classes, rest, styles, variables, accessibility }) {
    const { label, icon } = this.props

    return (
      <ElementType
        {...accessibility.attributes.root}
        {...accessibility.keyHandlers.root}
        {...rest}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onClick={this.handleClick}
        className={classes.root}
      >
        <Label styles={{ root: styles.label }}>
          {Icon.create(icon || '', {
            defaultProps: {
              circular: true,
              size: 'mini',
              variables: variables.icon,
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
