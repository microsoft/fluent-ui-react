import { Accessibility, toolbarBehavior, toggleButtonBehavior } from '@stardust-ui/accessibility'
import * as React from 'react'
import * as _ from 'lodash'
import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as PropTypes from 'prop-types'
import { Ref, toRefObject } from '@stardust-ui/react-component-ref'
import { EventListener } from '@stardust-ui/react-component-event-listener'

import {
  childrenExist,
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  ContentComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  ColorComponentProps,
  ShorthandFactory,
} from '../../lib'
import { mergeComponentVariables } from '../../lib/mergeThemes'

import { ShorthandCollection, ShorthandValue, WithAsProp, withSafeTypeForAs } from '../../types'

import ToolbarCustomItem from './ToolbarCustomItem'
import ToolbarDivider from './ToolbarDivider'
import ToolbarItem, { ToolbarItemProps } from './ToolbarItem'
import ToolbarMenu from './ToolbarMenu'
import ToolbarMenuDivider from './ToolbarMenuDivider'
import ToolbarMenuItem from './ToolbarMenuItem'
import ToolbarMenuRadioGroup from './ToolbarMenuRadioGroup'
import ToolbarRadioGroup from './ToolbarRadioGroup'
import Box from '../Box/Box'
import ToolbarOverflowMenu from './ToolbarOverflowMenu'

export type ToolbarItemShorthandKinds = 'divider' | 'item' | 'group' | 'toggle' | 'custom'

type PositionOffset = {
  vertical: number
  horizontal: number
}

export interface ToolbarProps
  extends UIComponentProps,
    ContentComponentProps,
    ChildrenComponentProps,
    ColorComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility

  /** Shorthand array of props for Toolbar. */
  items?: ShorthandCollection<ToolbarItemProps, ToolbarItemShorthandKinds>

  /**
   *  Automatically move overflow items to overflow menu.
   *  For automatic overflow to work correctly, toolbar items including overflowMenuItem
   *  must NOT change their size! If you need to change item's size, rerender the Toolbar.
   */
  overflow?: boolean
}

export interface ToolbarState {
  initialItems: ToolbarProps['items']
  currentItems: ToolbarProps['items']
  stableItems?: ToolbarProps['items']
  stable: boolean
}

class Toolbar extends UIComponent<WithAsProp<ToolbarProps>, ToolbarState> {
  static create: ShorthandFactory<ToolbarProps>

  static className = 'ui-toolbar'

  static displayName = 'Toolbar'

  static propTypes = {
    ...commonPropTypes.createCommon(),
    items: customPropTypes.collectionShorthandWithKindProp([
      'divider',
      'item',
      'group',
      'toggle',
      'custom',
    ]),
    overflow: PropTypes.bool,
  }

  static defaultProps = {
    accessibility: toolbarBehavior,
  }

  static CustomItem = ToolbarCustomItem
  static Divider = ToolbarDivider
  static Item = ToolbarItem
  static Menu = ToolbarMenu
  static MenuDivider = ToolbarMenuDivider
  static MenuItem = ToolbarMenuItem
  static MenuRadioGroup = ToolbarMenuRadioGroup
  static RadioGroup = ToolbarRadioGroup

  overflowContainerRef = React.createRef<HTMLElement>()
  overflowItemRef = React.createRef<HTMLElement>()
  offsetMeasureRef = React.createRef<HTMLElement>()

  // index of the last visible item in Toolbar, the rest goes to overflow menu
  lastVisibleItemIndex: number

  animationFrameId: number
  // renderStartTime: number // TODO: remove before merge
  // didMountTime: number
  rtl: boolean

  handleItemOverrides = variables => predefinedProps => ({
    variables: mergeComponentVariables(variables, predefinedProps.variables),
  })

  renderItems(items: ShorthandCollection<ToolbarItemProps, ToolbarItemShorthandKinds>, variables) {
    const itemOverridesFn = this.handleItemOverrides(variables)
    return _.map(
      items,
      (item: ShorthandValue<ToolbarItemProps & { kind?: ToolbarItemShorthandKinds }>) => {
        const kind = _.get(item, 'kind', 'item')

        switch (kind) {
          case 'divider':
            return ToolbarDivider.create(item, { overrideProps: itemOverridesFn })
          case 'group':
            return ToolbarRadioGroup.create(item, { overrideProps: itemOverridesFn })
          case 'toggle':
            return ToolbarItem.create(item, {
              defaultProps: { accessibility: toggleButtonBehavior },
              overrideProps: itemOverridesFn,
            })
          case 'custom':
            return ToolbarCustomItem.create(item, { overrideProps: itemOverridesFn })
          default:
            return ToolbarItem.create(item, { overrideProps: itemOverridesFn })
        }
      },
    )
  }

  hide(el: HTMLElement) {
    if (el.style.visibility === 'hidden') {
      return
    }

    el.style.visibility = 'hidden'
    const wasFocusable = el.getAttribute('data-is-focusable')
    if (wasFocusable) {
      el.setAttribute('data-sd-was-focusable', wasFocusable)
    }
    el.setAttribute('data-is-focusable', 'false')
  }

  show(el: HTMLElement) {
    if (el.style.visibility !== 'hidden') {
      return false
    }

    el.style.visibility = null
    const wasFocusable = el.getAttribute('data-sd-was-focusable')
    if (wasFocusable) {
      el.setAttribute('data-is-focusable', wasFocusable)
      el.removeAttribute('data-sd-was-focusable')
    } else {
      el.removeAttribute('data-is-focusable')
    }

    return true
  }

  /**
   * Checks if `item` overflows a `container`.
   * TODO: check and fix all margin combination
   */
  isItemOverflowing(itemBoundingRect: ClientRect, containerBoundingRect: ClientRect) {
    return (
      itemBoundingRect.right > containerBoundingRect.right ||
      itemBoundingRect.left < containerBoundingRect.left
    )
  }

  /**
   * Checks if `item` would collide with eventual position of `overflowItem`.
   */
  wouldItemCollide(
    $item: Element,
    itemBoundingRect: ClientRect,
    overflowItemBoundingRect: ClientRect,
    containerBoundingRect: ClientRect,
  ) {
    let wouldCollide
    if (this.rtl) {
      const itemLeftMargin =
        parseFloat(this.context.target.defaultView.getComputedStyle($item).marginLeft) || 0
      wouldCollide =
        itemBoundingRect.left - overflowItemBoundingRect.width - itemLeftMargin <
        containerBoundingRect.left

      // console.log('Collision [RTL]', {
      //   wouldCollide,
      //   'itemBoundingRect.left': itemBoundingRect.left,
      //   'overflowItemBoundingRect.width': overflowItemBoundingRect.width,
      //   itemRightMargin: itemLeftMargin,
      //   sum: itemBoundingRect.left - overflowItemBoundingRect.width - itemLeftMargin,
      //   'overflowContainerBoundingRect.left': containerBoundingRect.left,
      // })
    } else {
      const itemRightMargin =
        parseFloat(this.context.target.defaultView.getComputedStyle($item).marginRight) || 0
      wouldCollide =
        itemBoundingRect.right + overflowItemBoundingRect.width + itemRightMargin >
        containerBoundingRect.right

      // console.log('Collision', {
      //   wouldCollide,
      //   'itemBoundingRect.right': itemBoundingRect.right,
      //   'overflowItemBoundingRect.width': overflowItemBoundingRect.width,
      //   itemRightMargin,
      //   sum: itemBoundingRect.right + overflowItemBoundingRect.width + itemRightMargin,
      //   'overflowContainerBoundingRect.right': containerBoundingRect.right,
      // })
    }

    return wouldCollide
  }

  /**
   * Positions overflowItem next to lastVisible item
   * TODO: consider overflowItem margin
   */
  setOverflowPosition(
    $overflowItem: HTMLElement,
    $lastVisibleItem: HTMLElement | undefined,
    lastVisibleItemRect: ClientRect | undefined,
    containerBoundingRect: ClientRect,
    absolutePositioningOffset: PositionOffset,
  ) {
    if ($lastVisibleItem) {
      if (this.rtl) {
        const lastVisibleItemMarginLeft =
          // eslint-disable-next-line no-undef
          parseFloat(window.getComputedStyle($lastVisibleItem).marginLeft) || 0

        $overflowItem.style.right = `${containerBoundingRect.right -
          lastVisibleItemRect.left +
          lastVisibleItemMarginLeft +
          absolutePositioningOffset.horizontal}px`
      } else {
        const lastVisibleItemRightMargin =
          // eslint-disable-next-line no-undef
          parseFloat(window.getComputedStyle($lastVisibleItem).marginRight) || 0

        $overflowItem.style.left = `${lastVisibleItemRect.right -
          containerBoundingRect.left +
          lastVisibleItemRightMargin +
          absolutePositioningOffset.horizontal}px`
      }
    } else {
      // there is no last visible item -> position the overflow as the first item
      this.lastVisibleItemIndex = -1
      if (this.rtl) {
        $overflowItem.style.right = `${absolutePositioningOffset.horizontal}px`
      } else {
        $overflowItem.style.left = `${absolutePositioningOffset.horizontal}px`
      }
    }
  }

  hideOverflowItems = () => {
    const $overflowContainer = this.overflowContainerRef.current
    const $overflowItem = this.overflowItemRef.current
    const $offsetMeasure = this.offsetMeasureRef.current
    if (!$overflowContainer || !$overflowItem || !$offsetMeasure) {
      return
    }

    const $items = $overflowContainer.children

    const overflowContainerBoundingRect = $overflowContainer.getBoundingClientRect()
    const overflowItemBoundingRect = $overflowItem.getBoundingClientRect()
    const offsetMeasureBoundingRect = $offsetMeasure.getBoundingClientRect()

    // Absolute positioning offset
    // Overflow menu is absolutely positioned relative to root slot
    // If there is padding set on the root slot boundingClientRect computations use inner content box,
    // but absolute position is relative to root slot's PADDING box.
    // We compute absolute positioning offset
    // By measuring position of an offsetMeasure element absolutely positioned to 0,0.
    // TODO: replace by getComputedStyle('padding')
    const absolutePositioningOffset: PositionOffset = {
      horizontal: this.rtl
        ? offsetMeasureBoundingRect.right - overflowContainerBoundingRect.right
        : overflowContainerBoundingRect.left - offsetMeasureBoundingRect.left,
      vertical: overflowContainerBoundingRect.top - offsetMeasureBoundingRect.top,
    }

    let isOverflowing = false
    let $lastVisibleItem
    let lastVisibleItemRect

    // check all items from the last one back
    _.forEachRight($items, ($item: HTMLElement, i: number) => {
      if ($item === $overflowItem) {
        return true
      }

      const itemBoundingRect = $item.getBoundingClientRect()

      // if the item is out of the crop rectangle, hide it
      if (this.isItemOverflowing(itemBoundingRect, overflowContainerBoundingRect)) {
        isOverflowing = true
        // console.log('Overflow', i, {
        //   item: [itemBoundingRect.left, itemBoundingRect.right],
        //   crop: [overflowContainerBoundingRect.left, overflowContainerBoundingRect.right],
        // })
        this.hide($item)
        return true
      }

      // if there is an overflow, check collision of remaining items with eventual overflow position
      if (
        isOverflowing &&
        !$lastVisibleItem &&
        this.wouldItemCollide(
          $item,
          itemBoundingRect,
          overflowItemBoundingRect,
          overflowContainerBoundingRect,
        )
      ) {
        this.hide($item)
        return true
      }

      // Remember the last visible item
      if (!$lastVisibleItem) {
        $lastVisibleItem = $item
        lastVisibleItemRect = itemBoundingRect
        this.lastVisibleItemIndex = i
      }

      return this.show($item) // exit the loop when first visible item is found
    })

    // if there is an overflow,  position and show overflow item, otherwise hide it
    if (isOverflowing) {
      $overflowItem.style.position = 'absolute'
      this.setOverflowPosition(
        $overflowItem,
        $lastVisibleItem,
        lastVisibleItemRect,
        overflowContainerBoundingRect,
        absolutePositioningOffset,
      )
      this.show($overflowItem)
    } else {
      this.hide($overflowItem)
    }
  }

  getOverflowItems = () => {
    // TODO: (before merge) call this back to parent so it can modify items for overflow
    return this.props.items.slice(this.lastVisibleItemIndex + 1)
  }

  componentDidMount() {
    // this.didMountTime = performance.now()
    this.afterComponentRendered()
  }

  componentDidUpdate() {
    this.afterComponentRendered()
  }

  componentWillUnmount() {
    if (this.animationFrameId !== undefined) {
      this.context.target.defaultView.cancelAnimationFrame(this.animationFrameId)
      this.animationFrameId = undefined
    }
  }

  afterComponentRendered() {
    if (this.animationFrameId !== undefined) {
      this.context.target.defaultView.cancelAnimationFrame(this.animationFrameId)
    }

    // there are cases (like opening a portal and rendering the Toolbar there immediately) when rAF is necessary
    this.animationFrameId = this.context.target.defaultView.requestAnimationFrame(() => {
      this.hideOverflowItems()
      // const done = performance.now()
      // console.log(`rendered ${this.rtl ? ' (in rtl)' : ''}`, done - this.renderStartTime, done - this.didMountTime)
    })
  }

  renderComponent({
    accessibility,
    ElementType,
    classes,
    styles,
    variables,
    unhandledProps,
    rtl,
  }): React.ReactNode {
    const windowRef = toRefObject(this.context.target.defaultView)

    // this.renderStartTime = performance.now()
    this.rtl = rtl
    const { children, items, overflow } = this.props

    const offsetMeasure = {} // TODO: remove, see absolutePositioningOffset for details
    const overflowContainer = {} // TODO: create valid slot?

    if (!overflow) {
      return (
        <ElementType
          className={classes.root}
          {...accessibility.attributes.root}
          {...unhandledProps}
        >
          {childrenExist(children) ? children : this.renderItems(items, variables)}
        </ElementType>
      )
    }

    return (
      <>
        <ElementType
          className={classes.root}
          {...accessibility.attributes.root}
          {...unhandledProps}
        >
          <Ref innerRef={this.overflowContainerRef}>
            {Box.create(overflowContainer, {
              defaultProps: {
                styles: styles.overflowContainer,
              },
              overrideProps: {
                children: (
                  <>
                    {childrenExist(children) ? children : this.renderItems(items, variables)}
                    <Ref innerRef={this.overflowItemRef}>
                      <ToolbarOverflowMenu getOverflowItems={this.getOverflowItems} />
                    </Ref>
                  </>
                ),
              },
            })}
          </Ref>
          <Ref innerRef={this.offsetMeasureRef}>
            {Box.create(offsetMeasure, {
              defaultProps: {
                styles: styles.offsetMeasure,
              },
            })}
          </Ref>
        </ElementType>
        <EventListener
          listener={_.debounce(this.hideOverflowItems, 16)}
          targetRef={windowRef}
          type="resize"
        />
      </>
    )
  }
}

Toolbar.create = createShorthandFactory({ Component: Toolbar, mappedProp: 'content' })

/**
 * A Toolbar is a container for grouping a set of controls, often action controls (e.g. buttons) or input controls (e.g. checkboxes).
 *
 * @accessibility
 *  * Implements [ARIA Toolbar](https://www.w3.org/TR/wai-aria-practices-1.1/#toolbar) design pattern.
 * @accessibilityIssues
 * [Issue 988424: VoiceOver narrates selected for button in toolbar](https://bugs.chromium.org/p/chromium/issues/detail?id=988424)
 */
export default withSafeTypeForAs<typeof Toolbar, ToolbarProps>(Toolbar)
