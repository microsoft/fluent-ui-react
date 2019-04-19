import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'

import {
  AutoControlledComponent,
  createShorthandFactory,
  isFromKeyboard,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  applyAccessibilityKeyHandlers,
} from '../../lib'
import Box from '../Box/Box'
import { ComponentEventHandler, ReactProps, ShorthandValue } from '../../types'
import Icon from '../Icon/Icon'
import Ref from '../Ref/Ref'
import { Accessibility } from '../../lib/accessibility/types'
import { radioGroupItemBehavior } from '../../lib/accessibility'

export interface RadioGroupItemProps extends UIComponentProps, ChildrenComponentProps {
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
  label?: ShorthandValue

  /** Initial checked value. */
  defaultChecked?: boolean

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

  /** Whether should focus when checked */
  shouldFocus?: boolean // TODO: RFC #306

  /** The HTML input value. */
  value?: string | number

  /** A vertical radio group displays elements vertically. */
  vertical?: boolean
}

export interface RadioGroupItemState {
  checked: boolean
  isFromKeyboard: boolean
}

/**
 * A single radio within a radio group.
 * @accessibility
 * Radio items need to be grouped in RadioGroup component to correctly handle accessibility.
 */
class RadioGroupItem extends AutoControlledComponent<
  ReactProps<RadioGroupItemProps>,
  RadioGroupItemState
> {
  private elementRef = React.createRef<HTMLElement>()

  static create: Function

  static displayName = 'RadioGroupItem'

  static className = 'ui-radiogroup__item'

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    icon: customPropTypes.itemShorthand,
    label: customPropTypes.itemShorthand,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    checkedChanged: PropTypes.func,
    shouldFocus: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    vertical: PropTypes.bool,
  }

  static defaultProps = {
    as: 'div',
    accessibility: radioGroupItemBehavior as Accessibility,
  }

  static autoControlledProps = ['checked']

  componentDidUpdate(prevProps, prevState) {
    const checked = this.state.checked
    if (checked !== prevState.checked) {
      checked && this.props.shouldFocus && this.elementRef.current.focus()
      _.invoke(this.props, 'checkedChanged', undefined, { ...this.props, checked })
    }
  }

  handleFocus = (e: React.SyntheticEvent) => {
    this.setState({ isFromKeyboard: isFromKeyboard() })
    _.invoke(this.props, 'onFocus', e, this.props)
  }

  handleBlur = (e: React.SyntheticEvent) => {
    this.setState({ isFromKeyboard: false })
    _.invoke(this.props, 'onBlur', e, this.props)
  }

  handleClick = e => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  renderComponent({ ElementType, classes, unhandledProps, styles, accessibility }) {
    const { label, icon } = this.props

    return (
      <Ref innerRef={this.elementRef}>
        <ElementType
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onClick={this.handleClick}
          className={classes.root}
          {...accessibility.attributes.root}
          {...unhandledProps}
          {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
        >
          {Icon.create(icon || '', {
            defaultProps: {
              circular: true,
              bordered: true,
              size: 'smaller',
              styles: styles.icon,
            },
          })}
          {Box.create(label, {
            defaultProps: {
              as: 'span',
            },
          })}
        </ElementType>
      </Ref>
    )
  }
}

RadioGroupItem.create = createShorthandFactory({ Component: RadioGroupItem, mappedProp: 'label' })

export default RadioGroupItem
