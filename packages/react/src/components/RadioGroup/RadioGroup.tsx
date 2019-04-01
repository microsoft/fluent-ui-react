// TODO:
// vertical - padding variable?
import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  AutoControlledComponent,
  childrenExist,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
  applyAccessibilityKeyHandlers,
} from '../../lib'
import RadioGroupItem, { RadioGroupItemProps } from './RadioGroupItem'
import { radioGroupBehavior } from '../../lib/accessibility'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/types'
import { ReactProps, ShorthandValue, ComponentEventHandler } from '../../types'

export interface RadioGroupSlotClassNames {
  item: string
}

export interface RadioGroupProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default radioGroupBehavior
   * */
  accessibility?: Accessibility

  /** Value of the currently checked radio item. */
  checkedValue?: number | string

  /**
   * Called after radio group value is changed.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All value props.
   */
  checkedValueChanged?: ComponentEventHandler<RadioGroupItemProps>

  /** Initial checkedValue value. */
  defaultCheckedValue?: number | string

  /** Shorthand array of props for RadioGroup. */
  items?: ShorthandValue[]

  /** A vertical radio group displays elements vertically. */
  vertical?: boolean
}

/**
 * A radio group allows a user to select a value from a small set of options.
 * @accessibility
 * Implements ARIA Radio Group design pattern.
 */
class RadioGroup extends AutoControlledComponent<ReactProps<RadioGroupProps>, any> {
  static displayName = 'RadioGroup'

  static className = 'ui-radiogroup'

  static slotClassNames: RadioGroupSlotClassNames = {
    item: `${RadioGroup.className}__item`,
  }

  static create: Function

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    checkedValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    defaultCheckedValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    items: customPropTypes.collectionShorthand,
    checkedValueChanged: PropTypes.func,
    vertical: PropTypes.bool,
  }

  static defaultProps = {
    as: 'div',
    accessibility: radioGroupBehavior as Accessibility,
  }

  static autoControlledProps = ['checkedValue']

  static Item = RadioGroupItem

  renderComponent({ ElementType, classes, accessibility, unhandledProps }) {
    const { children, vertical } = this.props
    return (
      <ElementType
        {...accessibility.attributes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
        className={classes.root}
      >
        {childrenExist(children) ? children : this.renderItems(vertical)}
      </ElementType>
    )
  }

  protected actionHandlers: AccessibilityActionHandlers = {
    nextItem: event => this.setCheckedItem(event, 1),
    prevItem: event => this.setCheckedItem(event, -1),
  }

  private getItemProps = (item): RadioGroupItemProps => {
    return (item as React.ReactElement<RadioGroupItemProps>).props || item
  }

  private setCheckedItem = (event, direction) => {
    const nextItem = this.findNextEnabledCheckedItem(direction)

    if (nextItem) {
      this.setCheckedValue({
        checkedValue: nextItem.value,
        shouldFocus: true,
        event,
        props: nextItem,
      })
    }
    event.preventDefault()
  }

  private findNextEnabledCheckedItem = (direction): RadioGroupItemProps => {
    if (!this.props.items || !this.props.items.length) {
      return undefined
    }

    const currentIndex = _.findIndex(
      this.props.items,
      item => this.getItemProps(item).value === this.state.checkedValue,
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

      if (newIndex === currentIndex) {
        return undefined
      }

      const itemProps = this.getItemProps(this.props.items[newIndex])
      if (!itemProps.disabled) {
        return itemProps
      }
    }
    return undefined
  }

  private handleItemOverrides = predefinedProps => ({
    checked:
      typeof this.state.checkedValue !== 'undefined' &&
      this.state.checkedValue === predefinedProps.value,
    onClick: (event, itemProps) => {
      const { value, disabled } = itemProps
      if (!disabled && value !== this.state.checkedValue) {
        this.setCheckedValue({ checkedValue: value, shouldFocus: false, event, props: itemProps })
      }
      _.invoke(predefinedProps, 'onClick', event, itemProps)
    },
    shouldFocus: this.state.shouldFocus,
  })

  private renderItems = (vertical: boolean) => {
    const { items } = this.props

    return _.map(items, item =>
      RadioGroupItem.create(item, {
        defaultProps: { className: RadioGroup.slotClassNames.item, vertical },
        overrideProps: this.handleItemOverrides,
      }),
    )
  }

  private setCheckedValue({
    checkedValue,
    shouldFocus,
    event,
    props,
  }: {
    checkedValue: number | string
    shouldFocus: boolean
    event: React.SyntheticEvent
    props: RadioGroupItemProps
  }) {
    this.trySetState({ checkedValue })
    this.setState({ shouldFocus })

    _.invoke(this.props, 'checkedValueChanged', event, props)
  }
}

export default RadioGroup
