import * as React from 'react'
import * as _ from 'lodash'
import * as customPropTypes from '@stardust-ui/react-proptypes'
import { Ref } from '@stardust-ui/react-component-ref'

import {
  ChildrenComponentProps,
  ContentComponentProps,
  createShorthandFactory,
  UIComponentProps,
  UIComponent,
  childrenExist,
  commonPropTypes,
  applyAccessibilityKeyHandlers,
} from '../../lib'
import { mergeComponentVariables } from '../../lib/mergeThemes'

import { ShorthandCollection, WithAsProp, withSafeTypeForAs } from '../../types'
import { Accessibility } from '../../lib/accessibility/types'
import { toolbarRadioGroupBehavior, toolbarRadioGroupItemBehavior } from '../../lib/accessibility'

import ToolbarDivider from './ToolbarDivider'
import ToolbarItem from './ToolbarItem'

export type ToolbarRadioGroupItemShorthandKinds = 'divider' | 'item'

export interface ToolbarRadioGroupProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility

  /** Shorthand array of props for ToolbarRadioGroup. */
  items?: ShorthandCollection<ToolbarRadioGroupItemShorthandKinds>
}

class ToolbarRadioGroup extends UIComponent<WithAsProp<ToolbarRadioGroupProps>> {
  static displayName = 'ToolbarRadioGroup'

  static className = 'ui-toolbars' // FIXME: required by getComponentInfo/isConformant. But this is group inside a toolbar not a group of toolbars

  static create: Function

  static propTypes = {
    ...commonPropTypes.createCommon(),
    items: customPropTypes.collectionShorthandWithKindProp(['divider', 'item']),
  }

  static defaultProps = {
    accessibility: toolbarRadioGroupBehavior as Accessibility,
  }

  // when click on item - focus zone will handle focus
  // left/right handled by focus zone
  // when press up/down - identify current focused element - with tabIndex === 0

  actionHandlers = {
    nextItem: event => this.setFocusedItem(event, 1),
    prevItem: event => this.setFocusedItem(event, -1),
  }

  setFocusedItem(event, direction) {
    const currentIndex =
      _.findIndex(this.itemRefs, (item: React.RefObject<HTMLElement>) => {
        return item.current.tabIndex === 0
      }) || 0

    const itemsLength = this.itemRefs.length
    let nextIndex = currentIndex + direction

    if (nextIndex >= itemsLength) {
      nextIndex = 0
    }

    if (nextIndex < 0) {
      nextIndex = itemsLength - 1
    }

    const nextItemToFocus = this.itemRefs[nextIndex].current
    nextItemToFocus.focus()

    if (document.activeElement === nextItemToFocus) {
      event.stopPropagation()
    }
    event.preventDefault()
  }

  handleItemOverrides = variables => predefinedProps => ({
    variables: mergeComponentVariables(variables, predefinedProps.variables),
  })

  itemRefs: React.RefObject<HTMLElement>[] = []

  renderItems(items, variables) {
    const itemOverridesFn = this.handleItemOverrides(variables)
    this.itemRefs = []

    return _.map(items, (item, index) => {
      const kind = _.get(item, 'kind', 'item')

      const ref = React.createRef<HTMLElement>()
      this.itemRefs[index] = ref

      if (kind === 'divider') {
        return ToolbarDivider.create(item, { overrideProps: itemOverridesFn })
      }

      return (
        <Ref innerRef={ref}>
          {ToolbarItem.create(item, {
            defaultProps: {
              accessibility: toolbarRadioGroupItemBehavior,
            },
            overrideProps: itemOverridesFn,
          })}
        </Ref>
      )
    })
  }

  renderComponent({ ElementType, classes, variables, accessibility, unhandledProps }) {
    const { children, items } = this.props
    return (
      <ElementType
        {...accessibility.attributes.root}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
        className={classes.root}
      >
        {childrenExist(children) ? children : this.renderItems(items, variables)}
      </ElementType>
    )
  }
}

ToolbarRadioGroup.create = createShorthandFactory({
  Component: ToolbarRadioGroup,
  mappedProp: 'content',
})

/**
 * Toolbar radiogroup groups items where only one item can be active.
 * The radiogroup does not guarantee that, it just serves accessibility purposes.
 */
export default withSafeTypeForAs<typeof ToolbarRadioGroup, ToolbarRadioGroupProps>(
  ToolbarRadioGroup,
)
