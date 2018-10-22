import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'

import { customPropTypes, AutoControlledComponent, createShorthandFactory } from '../../lib'
import Label from '../Label/Label'
import {
  ComponentEventHandler,
  Extendable,
  ReactChildren,
  ShorthandRenderFunction,
  ShorthandValue,
} from '../../../types/utils'
import { ComponentVariablesInput, ComponentSlotStyle } from '../../themes/types'
import Icon from '../Icon/Icon'
import { Accessibility } from '../../lib/accessibility/types'
import { radioGroupItemBehavior } from '../../lib/accessibility'
import isFromKeyboard from '../../lib/isFromKeyboard'

export interface RadioGroupItemProps {
  accessibility?: Accessibility
  as?: any
  checked?: boolean
  checkedChanged?: ComponentEventHandler<RadioGroupItemProps>
  children?: ReactChildren
  className?: string
  label?: React.ReactNode
  defaultChecked?: boolean
  disabled?: boolean
  icon?: ShorthandValue
  name?: string
  renderIcon?: ShorthandRenderFunction
  shouldFocus?: boolean // TODO: RFC #306
  styles?: ComponentSlotStyle
  value?: string | number
  variables?: ComponentVariablesInput
  [isFromKeyboard.propertyName]?: boolean
  vertical?: boolean
}

export interface RadioGroupItemState {
  checked: boolean
  [isFromKeyboard.propertyName]: boolean
}

/**
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
    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    as: customPropTypes.as,

    /** Whether or not radio item is checked. */
    checked: PropTypes.bool,

    /**
     *  Used to set content when using childrenApi - internal only
     *  @docSiteIgnore
     */
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
    label: customPropTypes.contentShorthand,

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

    /**
     * A custom render function the icon slot.
     *
     * @param {React.ReactType} Component - The computed component for this slot.
     * @param {object} props - The computed props for this slot.
     * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
     */
    renderIcon: PropTypes.func,

    /** Whether should focus when checked */
    shouldFocus: PropTypes.bool,

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
