import { Accessibility, toolbarBehavior, toggleButtonBehavior } from '@stardust-ui/accessibility'
import * as React from 'react'
import * as _ from 'lodash'
import * as customPropTypes from '@stardust-ui/react-proptypes'
import cx from 'classnames'
import * as PropTypes from 'prop-types'
import ReactResizeDetector from 'react-resize-detector'
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
  applyAccessibilityKeyHandlers,
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
import Box, { BoxProps } from '../Box/Box'
import ToolbarOverflowMenu from './ToolbarOverflowMenu'

export type ToolbarItemShorthandKinds = 'divider' | 'item' | 'group' | 'toggle' | 'custom'

export interface OverflowMeasures {
  left: number
  leftFits: boolean
  right: number
  rightFits: boolean
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

  onReduceItems?: (
    currentItems: ShorthandCollection<ToolbarItemProps, ToolbarItemShorthandKinds>,
    measures: OverflowMeasures[],
  ) => ShorthandCollection<ToolbarItemProps, ToolbarItemShorthandKinds> | null // FIXME: does not work with children

  /** Shorthand for the hidden measurement container. Only used if onReduceItems is defined. */
  measurement?: ShorthandValue<BoxProps>

  /** Shorthand for the wrapper component.  Only used if onReduceItems is defined. */
  wrapper?: ShorthandValue<BoxProps>

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

  static slotClassNames: ToolbarSlotClassNames = {
    wrapper: `${Toolbar.className}__wrapper`,
    measurement: `${Toolbar.className}__measurement`,
  }

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
    onReduceItems: PropTypes.func,
    measurement: customPropTypes.itemShorthand,
    wrapper: customPropTypes.itemShorthand,
    overflow: PropTypes.bool,
  }

  static defaultProps = {
    accessibility: toolbarBehavior,
    measurement: {},
    wrapper: {},
  }

  static CustomItem = ToolbarCustomItem
  static Divider = ToolbarDivider
  static Item = ToolbarItem
  static Menu = ToolbarMenu
  static MenuDivider = ToolbarMenuDivider
  static MenuItem = ToolbarMenuItem
  static MenuRadioGroup = ToolbarMenuRadioGroup
  static RadioGroup = ToolbarRadioGroup

  state: ToolbarState = {
    initialItems: [],
    currentItems: [],
    stable: false,
  }

  wrapperRef = React.createRef<HTMLElement>()
  overflowMenuRef = React.createRef<HTMLElement>()
  hiddenToolbarRef = React.createRef<HTMLElement>()
  animationFrameId: number

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

  static getDerivedStateFromProps(props: ToolbarProps, state: ToolbarState) {
    if (props.items === state.initialItems) {
      return null
    }

    return {
      initialItems: props.items,
      currentItems: props.items,
      stableItems: state.stableItems,
      stable: false,
    }
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
    // this.afterComponentRendered()
  }

  componentWillUnmount() {
    if (this.animationFrameId !== undefined) {
      cancelAnimationFrame(this.animationFrameId)
      this.animationFrameId = undefined
    }
  }

  afterComponentRendered() {
    if (this.animationFrameId !== undefined) {
      cancelAnimationFrame(this.animationFrameId)
    }

    this.animationFrameId = requestAnimationFrame(() => {
      this.animationFrameId = undefined
      const { onReduceItems } = this.props
      if (_.isNil(onReduceItems) || !this.hiddenToolbarRef.current || this.state.stable) {
        return
      }
      const { fits, measures } = this.measureOverflow()
      this.setState(({ stable, currentItems }) => {
        if (fits) {
          return { stable: true, stableItems: currentItems, currentItems }
        }

        const reducedItems = onReduceItems(currentItems, measures)
        if (reducedItems === null) {
          return { stable: true, stableItems: currentItems, currentItems }
        }
        return { stable, currentItems: reducedItems }
      })
    })
  }

  measureOverflow(): { fits: boolean; measures: OverflowMeasures[] } {
    const wrapperRect = this.wrapperRef.current.getBoundingClientRect()
    const hiddenToolbarElement = this.hiddenToolbarRef.current

    const measures: OverflowMeasures[] = _.map(hiddenToolbarElement.children, child => {
      const rect = child.getBoundingClientRect()
      return {
        left: rect.left,
        leftFits: rect.left >= wrapperRect.left,
        right: rect.right,
        rightFits: rect.right <= wrapperRect.right,
      }
    })

    const fits = !_.some(measures, c => !c.leftFits || !c.rightFits)
    return { fits, measures }
  }

  onResize = (newWidth, newHeight) => {
    this.setState(({ initialItems }) => ({
      currentItems: initialItems,
      stable: false,
    }))
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
    const { children, items, onReduceItems, measurement, wrapper, overflow } = this.props

    if (!_.isNil(onReduceItems)) {
      return (
        <Ref innerRef={this.wrapperRef}>
          {Box.create(wrapper, {
            defaultProps: {
              className: cx(Toolbar.slotClassNames.wrapper, classes.wrapper),
              ...accessibility.attributes.wrapper,
              ...applyAccessibilityKeyHandlers(accessibility.keyHandlers.wrapper, wrapper),
            },
            overrideProps: () => ({
              children: (
                <>
                  {!this.state.stable &&
                    Box.create(measurement, {
                      defaultProps: {
                        className: cx(Toolbar.slotClassNames.measurement, classes.measurement),
                        ...accessibility.attributes.measurement,
                        ...applyAccessibilityKeyHandlers(
                          accessibility.keyHandlers.measurement,
                          wrapper,
                        ),
                      },
                      overrideProps: () => ({
                        children: (
                          <Ref innerRef={this.hiddenToolbarRef}>
                            <ElementType
                              className={classes.root}
                              {...accessibility.attributes.root}
                              {...unhandledProps}
                            >
                              {this.renderItems(this.state.currentItems, variables)}
                            </ElementType>
                          </Ref>
                        ),
                      }),
                    })}
                  {this.state.stableItems && (
                    <ElementType
                      className={classes.root}
                      {...accessibility.attributes.root}
                      {...unhandledProps}
                    >
                      {this.renderItems(this.state.stableItems, variables)}
                    </ElementType>
                  )}
                  <ReactResizeDetector skipOnMount handleWidth onResize={this.onResize} />
                </>
              ),
            }),
          })}
        </Ref>
      )
    }

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
