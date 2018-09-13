import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { AutoControlledComponent, childrenExist, customPropTypes } from '../../lib'
import Radio from './Radio'
import { RadioGroupBehavior } from '../../lib/accessibility'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/interfaces'

import {
  ComponentVariablesInput,
  ComponentVariablesObject,
  IComponentPartStylesInput,
} from '../../../types/theme'
import { Extendable, ItemShorthand, ReactChildren } from '../../../types/utils'

export interface IRadioGroupProps {
  accessibility?: Accessibility
  as?: any
  checkedIndex?: number | string
  children?: ReactChildren
  className?: string
  defaultCheckedIndex?: number | string
  items?: ItemShorthand[]
  styles?: IComponentPartStylesInput
  variables?: ComponentVariablesInput
}

class RadioGroup extends AutoControlledComponent<Extendable<IRadioGroupProps>, any> {
  static displayName = 'RadioGroup'

  static className = 'ui-radiogroup'

  static create: Function

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Index of the currently checked radio item. */
    checkedIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Initial checkedIndex value. */
    defaultCheckedIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** Shorthand array of props for RadioGroup. */
    items: customPropTypes.collectionShorthand,

    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    as: 'div',
    accessibility: RadioGroupBehavior as Accessibility,
  }

  static handledProps = [
    'accessibility',
    'checkedIndex',
    'as',
    'children',
    'className',
    'defaultCheckedIndex',
    'items',
    'styles',
    'variables',
  ]

  static autoControlledProps = ['checkedIndex']

  static Item = Radio

  actionHandlers: AccessibilityActionHandlers = {
    nextItem: event => this.setCheckItem(event, 1),
    prevItem: event => this.setCheckItem(event, -1),
  }

  setCheckItem = (event, direction) => {
    let newIndex = this.state.checkedIndex + direction
    if (newIndex < 0) {
      newIndex = 0
    } else if (newIndex >= this.props.items.length) {
      newIndex = this.props.items.length - 1
    }
    this.trySetState({ checkedIndex: newIndex })

    _.invoke(this.props, 'onChange', event, this.props.items[newIndex])
  }

  handleItemOverrides = predefinedProps => ({
    onChange: (e, itemProps) => {
      const { index } = itemProps

      this.trySetState({ checkedIndex: index })

      _.invoke(this.props, 'onChange', e, itemProps)
    },
  })

  renderItems = (variables: ComponentVariablesObject) => {
    const { items } = this.props
    const { checkedIndex } = this.state

    return _.map(items, (item, index) =>
      Radio.create(item, {
        defaultProps: {
          index,
          checked: parseInt(checkedIndex, 10) === index,
        },
        overrideProps: this.handleItemOverrides,
      }),
    )
  }

  renderComponent({ ElementType, classes, accessibility, variables, rest }) {
    const { children } = this.props
    return (
      <ElementType
        {...accessibility.attributes.root}
        // {...accessibility.keyHandlers.root}
        {...rest}
        className={classes.root}
      >
        {childrenExist(children) ? children : this.renderItems(variables)}
      </ElementType>
    )
  }
}

export default RadioGroup
