// TODO:
// vertical - padding variable?
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { AutoControlledComponent, childrenExist, customPropTypes } from '../../lib'
import RadioGroupItem, { IRadioGroupItemProps } from './RadioGroupItem'
import { radioGroupBehavior } from '../../lib/accessibility'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/interfaces'

import { ComponentVariablesInput, ComponentPartStyle } from '../../../types/theme'
import {
  Extendable,
  ReactChildren,
  ShorthandValue,
  ShorthandRenderFunction,
} from '../../../types/utils'

export interface IRadioGroupProps {
  accessibility?: Accessibility
  as?: any
  checkedValue?: number | string
  children?: ReactChildren
  className?: string
  defaultCheckedValue?: number | string
  items?: ShorthandValue[]
  renderItem?: ShorthandRenderFunction
  styles?: ComponentPartStyle
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

    /**
     *  Used to set content when using childrenApi - internal only
     *  @docSiteIgnore
     */
    children: PropTypes.node,

    /** Additional CSS class name(s) to apply.  */
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
    checkedValueChanged: PropTypes.func,

    /**
     * A custom render iterator for rendering each of the RadioGroup items.
     * The default component, props, and children are available for each item.
     *
     * @param {React.ReactType} Component - The computed component for this slot.
     * @param {object} props - The computed props for this slot.
     * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
     */
    renderItem: PropTypes.func,

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** A vertical radio group displays elements vertically. */
    vertical: PropTypes.bool,
  }

  static defaultProps = {
    as: 'div',
    accessibility: radioGroupBehavior as Accessibility,
  }

  static autoControlledProps = ['checkedValue']

  static Item = RadioGroupItem

  renderComponent({ ElementType, classes, accessibility, rest }) {
    const { children, vertical } = this.props
    return (
      <ElementType
        {...accessibility.attributes.root}
        {...accessibility.keyHandlers.root}
        {...rest}
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

  private getItemProps = (item): IRadioGroupItemProps => {
    return (item as React.ReactElement<IRadioGroupItemProps>).props || item
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

  private findNextEnabledCheckedItem = (direction): IRadioGroupItemProps => {
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
    const { items, renderItem } = this.props

    return _.map(items, item =>
      RadioGroupItem.create(item, {
        defaultProps: { vertical },
        overrideProps: this.handleItemOverrides,
        render: renderItem,
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
    props: IRadioGroupItemProps
  }) {
    this.trySetState({ checkedValue })
    this.setState({ shouldFocus })

    _.invoke(this.props, 'checkedValueChanged', event, props)
  }
}

export default RadioGroup
