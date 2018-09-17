// TODO:
// vertical - padding variable?
// Radio-test failing with Stateless function components cannot be given refs. Attempts to access this ref will fail.
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { AutoControlledComponent, childrenExist, customPropTypes } from '../../lib'
import RadioGroupItem, { IRadioGroupItemProps } from './RadioGroupItem'
import { RadioGroupBehavior } from '../../lib/accessibility'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/interfaces'

import { ComponentVariablesInput, ComponentVariablesObject, IComponentPartStylesInput } from 'theme'
import { Extendable, ItemShorthand, ReactChildren } from 'utils'

export interface IRadioGroupProps {
  accessibility?: Accessibility
  as?: any
  checkedValue?: number | string
  children?: ReactChildren
  className?: string
  defaultCheckedValue?: number | string
  items?: ItemShorthand[]
  styles?: IComponentPartStylesInput
  variables?: ComponentVariablesInput
  vertical?: boolean
}

class RadioGroup extends AutoControlledComponent<Extendable<IRadioGroupProps>, any> {
  static displayName = 'RadioGroup'

  static className = 'ui-radiogroup'

  static create: Function

  static propTypes = {
    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Value of the currently checked radio item. */
    checkedValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Initial checkedValue value. */
    defaultCheckedValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** Shorthand array of props for RadioGroup. */
    items: customPropTypes.collectionShorthand,

    /**
     * Called after radio group value is changed.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All value props.
     */
    onChange: PropTypes.func,

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** A vertical radio group displays elements vertically. */
    vertical: PropTypes.bool,
  }

  static defaultProps = {
    as: 'div',
    accessibility: RadioGroupBehavior as Accessibility,
  }

  static handledProps = [
    'accessibility',
    'as',
    'checkedValue',
    'children',
    'className',
    'defaultCheckedValue',
    'items',
    'onChange',
    'styles',
    'variables',
    'vertical',
  ]

  static autoControlledProps = ['checkedValue']

  static Item = RadioGroupItem

  actionHandlers: AccessibilityActionHandlers = {
    nextItem: event => this.setCheckedItem(event, 1),
    prevItem: event => this.setCheckedItem(event, -1),
  }

  setCheckedItem = (event, direction) => {
    const nextItem = this.findNextEnabledCheckedItem(direction)

    if (nextItem) {
      this.trySetState({ checkedValue: nextItem.value })
      _.invoke(this.props, 'onChange', event, nextItem)
    }

    event.preventDefault()
  }

  findNextEnabledCheckedItem = (direction): IRadioGroupItemProps => {
    if (!this.props.items || this.props.items.length === 0) {
      return undefined
    }

    const currentIndex = this.props.items.findIndex(
      item => (item as IRadioGroupItemProps).value === this.state.checkedValue,
    )

    for (
      let newIndex = currentIndex + direction;
      newIndex !== currentIndex;
      newIndex += direction
    ) {
      if (newIndex < 0) {
        newIndex = this.props.items.length - 1
      } else if (newIndex >= this.props.items.length) {
        newIndex = 0
      }

      if (newIndex < 0 || newIndex >= this.props.items.length || newIndex === currentIndex) {
        return undefined
      }

      const itemProps = this.props.items[newIndex] as IRadioGroupItemProps
      if (!itemProps.disabled) {
        return itemProps
      }
    }
    return undefined
  }

  handleItemOverrides = predefinedProps => ({
    onClick: (e, itemProps) => {
      const { value, disabled } = itemProps
      if (!disabled && value !== this.state.checkedValue) {
        this.trySetState({ checkedValue: value })
        _.invoke(this.props, 'onChange', event, itemProps)
      }
      _.invoke(predefinedProps, 'onClick', e, itemProps)
    },
  })

  renderItems = (variables: ComponentVariablesObject, vertical: boolean) => {
    const { items } = this.props
    const { checkedValue } = this.state

    return _.map(items, (item, index) =>
      RadioGroupItem.create(item, {
        defaultProps: {
          checked: typeof checkedValue !== 'undefined' && checkedValue === item.value,
          vertical,
        },
        overrideProps: this.handleItemOverrides,
      }),
    )
  }

  renderComponent({ ElementType, classes, accessibility, variables, rest }) {
    const { children, vertical } = this.props
    return (
      <ElementType
        {...accessibility.attributes.root}
        {...accessibility.keyHandlers.root}
        {...rest}
        className={classes.root}
      >
        {childrenExist(children) ? children : this.renderItems(variables, vertical)}
      </ElementType>
    )
  }
}

export default RadioGroup
