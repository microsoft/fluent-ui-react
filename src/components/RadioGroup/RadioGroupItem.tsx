import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'

import { AutoControlledComponent, createShorthandFactory, customPropTypes } from '../../lib'
import Label from '../Label'
import {
  ComponentEventHandler,
  Extendable,
  ItemShorthand,
  ReactChildren,
} from '../../../types/utils'
import { ComponentPartStyle, ComponentVariablesInput } from '../../../types/theme'
import Icon from '../Icon/Icon'
import { Accessibility } from '../../lib/accessibility/interfaces'
import { RadioGroupItemBehavior } from '../../lib/accessibility'
import isFromKeyboard from '../../lib/isFromKeyboard'

export interface IRadioGroupItemProps {
  accessibility?: Accessibility
  as?: any
  checked?: boolean
  checkedChanged?: ComponentEventHandler<IRadioGroupItemProps>
  children?: ReactChildren
  className?: string
  defaultChecked?: boolean
  disabled?: boolean
  icon?: ItemShorthand
  label?: string
  name?: string
  styles?: ComponentPartStyle
  value?: string | number
  variables?: ComponentVariablesInput
  isFromKeyboard?: boolean
  vertical?: boolean
}

/**
 * @accessibility
 * Radio items need to be grouped in RadioGroup component to correctly handle accessibility.
 */
class RadioGroupItem extends AutoControlledComponent<Extendable<IRadioGroupItemProps>, any> {
  static create: Function

  static displayName = 'RadioGroupItem'

  static className = 'ui-radiogroup__item'

  static propTypes = {
    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    as: customPropTypes.as,

    /** Whether or not radio item is checked. */
    checked: PropTypes.bool,

    /** Child content * */
    children: PropTypes.node,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** Initial checked value. */
    defaultChecked: PropTypes.bool,

    /** Default value for isFromKeyboard (autocontrolled). */
    defaultIsFromKeyboard: PropTypes.bool,

    /** A radio item can appear disabled and be unable to change states. */
    disabled: PropTypes.bool,

    /** The radio item indicator can be user-defined icon */
    icon: customPropTypes.itemShorthand,

    /** Whether focus came from the keyboard (autocontrolled). */
    isFromKeyboard: PropTypes.bool,

    /** The label of the radio item. */
    label: PropTypes.string,

    /** The HTML input name. */
    name: PropTypes.string,

    /**
     * Called after radio item blurs.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onBlur: PropTypes.func,

    /**
     * Called after radio item is clicked.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick: PropTypes.func,

    /**
     * Called after radio item gets focus.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onFocus: PropTypes.func,

    /**
     * Called after radio item checked state is changed.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    checkedChanged: PropTypes.func,

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** The HTML input value. */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** A vertical radio group displays elements vertically. */
    vertical: PropTypes.bool,
  }

  static defaultProps = {
    as: 'div',
    accessibility: RadioGroupItemBehavior as Accessibility,
  }

  static autoControlledProps = ['checked', isFromKeyboard.propertyName]

  elementRef: HTMLElement

  componentDidMount() {
    this.elementRef = ReactDOM.findDOMNode(this) as HTMLElement
  }

  componentDidUpdate(prevProps, prevState) {
    const checked = this.state.checked
    if (checked !== prevState.checked) {
      checked && this.elementRef.focus()
      _.invoke(this.props, 'checkedChanged', undefined, { ...this.props, checked })
    }
  }

  private handleFocus = (e: React.SyntheticEvent) => {
    this.setState(isFromKeyboard.state())
    _.invoke(this.props, 'onFocus', e, this.props)
  }

  private handleBlur = (e: React.SyntheticEvent) => {
    this.setState(isFromKeyboard.initial)
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
        <Label styles={styles.label}>
          {Icon.create(icon || '', {
            defaultProps: {
              circular: true,
              size: 'mini',
              variables: variables.icon,
              styles: styles.icon,
            },
          })}
          {label}
        </Label>
      </ElementType>
    )
  }
}

RadioGroupItem.create = createShorthandFactory(RadioGroupItem, () => ({}))

export default RadioGroupItem
