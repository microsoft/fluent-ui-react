import * as React from 'react'
import * as _ from 'lodash'
import * as customPropTypes from '@stardust-ui/react-proptypes'
import cx from 'classnames'
import ReactResizeDetector from 'react-resize-detector'
import { Ref } from '@stardust-ui/react-component-ref'

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
} from '../../lib'
import { mergeComponentVariables } from '../../lib/mergeThemes'

import { Accessibility } from '../../lib/accessibility/types'
import { toolbarBehavior, toggleButtonBehavior } from '../../lib/accessibility'
import { ShorthandCollection, ShorthandValue, WithAsProp, withSafeTypeForAs } from '../../types'

import ToolbarCustomItem from './ToolbarCustomItem'
import ToolbarDivider from './ToolbarDivider'
import ToolbarItem, { ToolbarItemProps } from './ToolbarItem'
import ToolbarMenu from './ToolbarMenu'
import ToolbarMenuDivider from './ToolbarMenuDivider'
import ToolbarMenuItem from './ToolbarMenuItem'
import ToolbarRadioGroup from './ToolbarRadioGroup'
import Box, { BoxProps } from '../Box/Box'
import * as PropTypes from 'prop-types'

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
  static create: Function

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
  static RadioGroup = ToolbarRadioGroup

  state: ToolbarState = {
    initialItems: [],
    currentItems: [],
    stable: false,
  }

  wrapperRef = React.createRef<HTMLElement>()
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

  componentDidMount() {
    this.afterComponentRendered()
  }

  componentDidUpdate() {
    this.afterComponentRendered()
  }

  componentWillUnmount() {
    if (this.animationFrameId !== undefined) {
      window.cancelAnimationFrame(this.animationFrameId)
      this.animationFrameId = undefined
    }
  }

  afterComponentRendered() {
    if (this.animationFrameId !== undefined) {
      window.cancelAnimationFrame(this.animationFrameId)
    }
    this.animationFrameId = window.requestAnimationFrame(() => {
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

  renderComponent({
    accessibility,
    ElementType,
    classes,
    variables,
    unhandledProps,
  }): React.ReactNode {
    const { children, items, onReduceItems, measurement, wrapper } = this.props

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
                  <ReactResizeDetector xskipOnMount handleWidth onResize={this.onResize} />
                </>
              ),
            }),
          })}
        </Ref>
      )
    }

    return (
      <ElementType className={classes.root} {...accessibility.attributes.root} {...unhandledProps}>
        {childrenExist(children) ? children : this.renderItems(items, variables)}
      </ElementType>
    )
  }
}

Toolbar.create = createShorthandFactory({ Component: Toolbar, mappedProp: 'content' })

/**
 * A Toolbar is a container for grouping a set of controls, often action controls (e.g. buttons) or input controls (e.g. checkboxes).
 *
 * @accessibility
 * Implements [ARIA Toolbar](https://www.w3.org/TR/wai-aria-practices-1.1/#toolbar) design pattern.
 * @accessibilityIssues
 * [Issue 988424: VoiceOver narrates selected for button in toolbar](https://bugs.chromium.org/p/chromium/issues/detail?id=988424)
 */
export default withSafeTypeForAs<typeof Toolbar, ToolbarProps>(Toolbar)
