import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'

import { customPropTypes, AutoControlledComponent, createShorthandFactory } from '../../lib'
import Label from '../Label/Label'
import {
  ComponentEventHandler,
  Extendable,
  ShorthandRenderFunction,
  ShorthandValue,
} from '../../../types/utils'
import Icon from '../Icon/Icon'
import { Accessibility } from '../../lib/accessibility/types'
import { radioGroupItemBehavior } from '../../lib/accessibility'
import isFromKeyboard from '../../lib/isFromKeyboard'
import { UIComponentProps, ChildrenComponentProps } from '../../lib/commonPropInterfaces'
import { commonUIComponentPropTypes, childrenComponentPropTypes } from '../../lib/commonPropTypes'

export interface RadioGroupItemProps extends UIComponentProps<any, any>, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default radioGroupItemBehavior
   * */
  accessibility?: Accessibility

  /** Whether or not radio item is checked. */
  checked?: boolean

  /**
   * Called after radio item checked state is changed.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  checkedChanged?: ComponentEventHandler<RadioGroupItemProps>

  /** The label of the radio item. */
  label?: React.ReactNode

  /** Initial checked value. */
  defaultChecked?: boolean

  /** Default value for isFromKeyboard (autocontrolled). */
  defaultIsFromKeyboard?: boolean

  /** A radio item can appear disabled and be unable to change states. */
  disabled?: boolean

  /** The radio item indicator can be user-defined icon */
  icon?: ShorthandValue

  /** The HTML input name. */
  name?: string

  /**
   * Called after radio item blurs.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onBlur?: ComponentEventHandler<RadioGroupItemProps>

  /**
   * Called after radio item is clicked.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: ComponentEventHandler<RadioGroupItemProps>

  /**
   * Called after radio item gets focus.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onFocus?: ComponentEventHandler<RadioGroupItemProps>

  /**
   * A custom render function the icon slot.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderIcon?: ShorthandRenderFunction

  /** Whether should focus when checked */
  shouldFocus?: boolean // TODO: RFC #306

  /** The HTML input value. */
  value?: string | number

  /** Whether focus came from the keyboard (autocontrolled). */
  [isFromKeyboard.propertyName]?: boolean

  /** A vertical radio group displays elements vertically. */
  vertical?: boolean
}

export interface RadioGroupItemState {
  checked: boolean
  [isFromKeyboard.propertyName]: boolean
}

/**
 * A single radio within a radio group.
 * @accessibility
 * Radio items need to be grouped in RadioGroup component to correctly handle accessibility.
 */
class RadioGroupItem extends AutoControlledComponent<
  Extendable<RadioGroupItemProps>,
  RadioGroupItemState
> {
  private elementRef: HTMLElement

  static create: Function

  static displayName = 'RadioGroupItem'

  static className = 'ui-radiogroup__item'

  static propTypes = {
    ...commonUIComponentPropTypes,
    ...childrenComponentPropTypes,
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    /** Default value for isFromKeyboard (autocontrolled). */
    defaultIsFromKeyboard: PropTypes.bool,
    disabled: PropTypes.bool,
    icon: customPropTypes.itemShorthand,
    isFromKeyboard: PropTypes.bool,
    label: customPropTypes.contentShorthand,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    checkedChanged: PropTypes.func,
    renderIcon: PropTypes.func,
    shouldFocus: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    vertical: PropTypes.bool,
  }

  static defaultProps = {
    as: 'div',
    accessibility: radioGroupItemBehavior as Accessibility,
  }

  static autoControlledProps = ['checked', isFromKeyboard.propertyName]

  componentDidUpdate(prevProps, prevState) {
    const checked = this.state.checked
    if (checked !== prevState.checked) {
      checked && this.props.shouldFocus && this.elementRef.focus()
      _.invoke(this.props, 'checkedChanged', undefined, { ...this.props, checked })
    }
  }

  componentDidMount() {
    this.elementRef = ReactDOM.findDOMNode(this) as HTMLElement
  }

  renderComponent({ ElementType, classes, rest, styles, variables, accessibility }) {
    const { label, icon, renderIcon } = this.props

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
              render: renderIcon,
            },
          })}
          {label}
        </Label>
      </ElementType>
    )
  }

  private handleFocus = (e: React.SyntheticEvent) => {
    this.setState(isFromKeyboard.state())
    _.invoke(this.props, 'onFocus', e, this.props)
  }

  private handleBlur = (e: React.SyntheticEvent) => {
    this.setState(isFromKeyboard.initial)
    _.invoke(this.props, 'onBlur', e, this.props)
  }

  private handleClick = e => {
    _.invoke(this.props, 'onClick', e, this.props)
  }
}

RadioGroupItem.create = createShorthandFactory(RadioGroupItem, () => ({}))

export default RadioGroupItem
