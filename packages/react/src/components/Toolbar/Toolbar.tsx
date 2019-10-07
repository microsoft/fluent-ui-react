import { Accessibility, toolbarBehavior, toggleButtonBehavior } from '@stardust-ui/accessibility'
import * as React from 'react'
import * as _ from 'lodash'
import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as PropTypes from 'prop-types'
import { Ref } from '@stardust-ui/react-component-ref'
import { windowRef, EventListener } from '@stardust-ui/react-component-event-listener'

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

import { ShorthandCollection, WithAsProp, withSafeTypeForAs } from '../../types'

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

export interface ToolbarSlotClassNames {
  wrapper: string
  measurement: string
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

  wrapperRef = React.createRef<HTMLElement>()
  overflowMenuRef = React.createRef<HTMLElement>()

  handleItemOverrides = variables => predefinedProps => ({
    variables: mergeComponentVariables(variables, predefinedProps.variables),
  })

  renderItems(items, variables) {
    const itemOverridesFn = this.handleItemOverrides(variables)
    return _.map(items, item => {
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
    })
  }

  debug(el, color) {
    // el.style.borderColor = color
    // el.style.borderRadius = '0'
  }

  undebug(el) {
    // el.style.borderColor = 'transparent'
    // el.style.borderRadius = '50%'
  }

  hide(el) {
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

  show(el) {
    // if (el.style.visibility !== 'hidden') {
    //   return
    // }

    el.style.visibility = null
    // delete el.style.visibility
    const wasFocusable = el.getAttribute('data-sd-was-focusable')
    if (wasFocusable) {
      el.setAttribute('data-is-focusable', wasFocusable)
      el.removeAttribute('data-sd-was-focusable')
    } else {
      el.removeAttribute('data-is-focusable')
    }
  }

  lastVisibleItemIndex: number
  offsetMeasureRef = React.createRef<HTMLElement>()

  hackyDOMOverflow = () => {
    const $wrapper = this.wrapperRef.current
    const $overflowItem = this.overflowMenuRef.current
    const $offsetMeasure = this.offsetMeasureRef.current
    if (!$wrapper || !$overflowItem || !$offsetMeasure) {
      return
    }

    const $items = $wrapper.children

    const wrapperBoundingRect = $wrapper.getBoundingClientRect()
    const overflowItemBoundingRect = $overflowItem.getBoundingClientRect()
    const offsetMeasureBoundingRect = $offsetMeasure.getBoundingClientRect()
    // Absolute positioning offset
    // Overflow menu is absolutely positioned relative to root slot
    // If there is padding set on the root slot boundingClientRect computations use inner content box,
    // but absolute position is relative to root slot's PADDING box.
    // As there is no easy way how to compute padding, we compute absolute positioning offset
    // By measuring position of an offsetMeasure element absolutely positioned to 0,0.
    const absolutePositioningOffset = {
      vertical: wrapperBoundingRect.left - offsetMeasureBoundingRect.left,
      horizontal: wrapperBoundingRect.top - offsetMeasureBoundingRect.top,
    }

    let isOverflowing = false
    let $lastVisibleItem
    let lastVisibleItemRect
    _.forEachRight($items, ($item, i) => {
      if ($item === $overflowItem) {
        return
      }
      const itemBoundingRect = $item.getBoundingClientRect()
      if ($item.getBoundingClientRect().right > wrapperBoundingRect.right) {
        isOverflowing = true
        // console.log(
        //   'Overflow',
        //   i,
        //   $item.getBoundingClientRect().right,
        //   $wrapper.getBoundingClientRect().right,
        // )
        this.debug($item, 'red')
        this.hide($item)
        return
      }

      if (isOverflowing) {
        // eslint-disable-next-line no-undef
        const itemRightMargin = parseFloat(window.getComputedStyle($item).marginRight) || 0
        if (
          itemBoundingRect.right + overflowItemBoundingRect.width + itemRightMargin >
          wrapperBoundingRect.right
        ) {
          // test RTL
          // console.log('Collision', {
          //   'itemBoundingRect.right': itemBoundingRect.right,
          //   'overflowItemBoundingRect.width': overflowItemBoundingRect.width,
          //   'itemRightMargin': itemRightMargin,
          //   sum: itemBoundingRect.right + overflowItemBoundingRect.width + itemRightMargin,
          //   'wrapperBoundingRect.right': wrapperBoundingRect.right,
          // })
          this.debug($item, 'magenta')
          this.hide($item)
          return
        }
      }
      if (!$lastVisibleItem) {
        $lastVisibleItem = $item
        lastVisibleItemRect = itemBoundingRect
        this.lastVisibleItemIndex = i
      }

      this.undebug($item)
      this.show($item) // stop when first visible item is found
    })

    if (isOverflowing) {
      this.debug($overflowItem, 'green')

      $overflowItem.style.visibility = 'absolute'

      if ($lastVisibleItem) {
        this.debug($lastVisibleItem, 'lime')

        const lastVisibleItemRightMargin =
          // eslint-disable-next-line no-undef
          parseFloat(window.getComputedStyle($lastVisibleItem).marginRight) || 0

        $overflowItem.style.left = `${lastVisibleItemRect.right -
          wrapperBoundingRect.left +
          lastVisibleItemRightMargin +
          absolutePositioningOffset.vertical}px`
        // $overflowItem.style.top = `${lastVisibleItemRect.top - wrapperBoundingRect.top + absolutePositioningOffset.horizontal}px`
      } else {
        this.lastVisibleItemIndex = -1
        $overflowItem.style.left = `${absolutePositioningOffset.vertical}px`
        // $overflowItem.style.top = `${absolutePositioningOffset.horizontal}px`
      }
      this.show($overflowItem)
    } else {
      this.undebug($overflowItem)
      this.hide($overflowItem)
    }
  }

  getOverflowItems = () => {
    return this.props.items.slice(this.lastVisibleItemIndex + 1)
  }

  componentDidMount() {
    const dm = performance.now()
    this.hackyDOMOverflow()
    const done = performance.now()
    console.log(`rendered ${this.rtl ? ' (in rtl)' : ''}`, done - this.renderStartTime, done - dm)
    // this.afterComponentRendered()
  }

  componentDidUpdate() {
    this.hackyDOMOverflow()
  }

  renderStartTime
  rtl = false

  renderComponent({
    accessibility,
    ElementType,
    classes,
    styles,
    variables,
    unhandledProps,
    rtl,
  }): React.ReactNode {
    this.renderStartTime = performance.now()
    this.rtl = rtl
    const { children, items, overflow } = this.props

    const offsetMeasure = {}
    const overflowCrop = {}

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
          <Ref innerRef={this.wrapperRef}>
            {Box.create(overflowCrop, {
              defaultProps: {
                styles: styles.overflowCrop,
              },
              overrideProps: {
                children: (
                  <>
                    {childrenExist(children) ? children : this.renderItems(items, variables)}
                    <Ref innerRef={this.overflowMenuRef}>
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
          listener={_.debounce(this.hackyDOMOverflow, 16)}
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
