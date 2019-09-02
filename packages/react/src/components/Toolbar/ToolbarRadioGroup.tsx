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
  CreateShorthandFactoryResult,
} from '../../lib'
import { mergeComponentVariables } from '../../lib/mergeThemes'

import { ShorthandCollection, WithAsProp, withSafeTypeForAs } from '../../types'
import { Accessibility } from '../../lib/accessibility/types'
import { toolbarRadioGroupBehavior, toolbarRadioGroupItemBehavior } from '../../lib/accessibility'

import ToolbarDivider from './ToolbarDivider'
import ToolbarItem, { ToolbarItemProps } from './ToolbarItem'

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
  items?: ShorthandCollection<ToolbarItemProps, ToolbarRadioGroupItemShorthandKinds>
}

class ToolbarRadioGroup extends UIComponent<WithAsProp<ToolbarRadioGroupProps>> {
  static displayName = 'ToolbarRadioGroup'

  static className = 'ui-toolbars' // FIXME: required by getComponentInfo/isConformant. But this is group inside a toolbar not a group of toolbars

  static create: CreateShorthandFactoryResult

  static propTypes = {
    ...commonPropTypes.createCommon(),
    items: customPropTypes.collectionShorthandWithKindProp(['divider', 'item']),
  }

  static defaultProps = {
    accessibility: toolbarRadioGroupBehavior as Accessibility,
  }

  itemRefs: React.RefObject<HTMLElement>[] = []

  actionHandlers = {
    nextItem: event => this.setFocusedItem(event, 1),
    prevItem: event => this.setFocusedItem(event, -1),
  }

  setFocusedItem = (event, direction) => {
    const { items } = this.props

    // filter items which are not disabled
    const filteredRadioItems: React.RefObject<HTMLElement>[] = _.filter(
      this.itemRefs,
      (item, index) => {
        const currentItem = items[index] as ToolbarItemProps
        return currentItem && !currentItem.disabled
      },
    )

    // get the index of currently focused element (w/ tabindex = 0) or the first one as default
    const currentFocusedIndex =
      _.findIndex(filteredRadioItems, (item: React.RefObject<HTMLElement>) => {
        return item.current.tabIndex === 0
      }) || 0

    const itemsLength = filteredRadioItems.length
    let nextIndex = currentFocusedIndex + direction

    if (nextIndex >= itemsLength) {
      nextIndex = 0
    }

    if (nextIndex < 0) {
      nextIndex = itemsLength - 1
    }

    const nextItemToFocus = filteredRadioItems[nextIndex].current
    if (nextItemToFocus) {
      nextItemToFocus.focus()
    }

    if (document.activeElement === nextItemToFocus) {
      event.stopPropagation()
    }
    event.preventDefault()
  }

  handleItemOverrides = variables => predefinedProps => ({
    variables: mergeComponentVariables(variables, predefinedProps.variables),
  })

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

      const toolbarItem = ToolbarItem.create(item, {
        defaultProps: {
          accessibility: toolbarRadioGroupItemBehavior,
        },
        overrideProps: itemOverridesFn,
      })

      return (
        <Ref innerRef={ref} key={toolbarItem.key}>
          {toolbarItem}
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
 * A ToolbarRadiouGroup renders Toolbar item as a group of mutually exclusive options.
 * Component doesn't implement mutual exclusiveness, it just serves accessibility purposes.
 *
 * @accessibility
 * Implements [ARIA RadioGroup](https://www.w3.org/TR/wai-aria-practices/#radiobutton) design pattern.
 */
export default withSafeTypeForAs<typeof ToolbarRadioGroup, ToolbarRadioGroupProps>(
  ToolbarRadioGroup,
)
