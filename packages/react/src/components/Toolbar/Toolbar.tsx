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

export interface ToolbarProps
  extends UIComponentProps,
    ContentComponentProps,
    ChildrenComponentProps,
    ColorComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default toolbarBehavior
   */
  accessibility?: Accessibility

  /** Shorthand array of props for Toolbar. */
  items?: ShorthandCollection<ToolbarItemProps, ToolbarItemShorthandKinds>

  onReduceItems?: (
    currentItems: ShorthandCollection<ToolbarItemProps, ToolbarItemShorthandKinds>,
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

  measurementRef = React.createRef<HTMLElement>()

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

  afterComponentRendered() {
    const { onReduceItems } = this.props
    if (_.isNil(onReduceItems) || !this.measurementRef.current) {
      return
    }

    window.requestAnimationFrame(() => {
      const { fits } = this.measureOverflow(this.measurementRef.current)
      this.setState(({ stable, currentItems }) => {
        if (fits) {
          return { stable: true, stableItems: currentItems, currentItems } // FIXME: why I need to add currentItems???
        }

        const reducedItems = onReduceItems(currentItems)
        if (reducedItems === null) {
          return { stable: true, stableItems: currentItems, currentItems }
        }
        return { stable, currentItems: reducedItems }
      })
    })
  }

  measureOverflow(container: HTMLElement) {
    const containerRect = container.getBoundingClientRect()

    console.log('measureOverflow', containerRect.left, containerRect.right)

    const children = _.map(container.children, child => {
      const rect = child.getBoundingClientRect()
      return {
        left: rect.left,
        leftFits: rect.left >= containerRect.left,
        right: rect.right,
        rightFits: rect.right <= containerRect.right,
      }
    })

    console.table(children)
    const fits = !_.some(children, c => !c.leftFits || !c.rightFits)
    return { fits, children }
  }

  onResize = (newWidth, newHeight) => {
    console.log(`onResize -> ${newWidth} x ${newHeight}`)
  }

  renderComponent({
    accessibility,
    ElementType,
    classes,
    variables,
    unhandledProps,
  }): React.ReactNode {
    const { children, items, onReduceItems, measurement, wrapper } = this.props

    const renderedToolbar = (
      <ElementType className={classes.root} {...accessibility.attributes.root} {...unhandledProps}>
        {childrenExist(children) ? children : this.renderItems(items, variables)}
      </ElementType>
    )

    if (!_.isNil(onReduceItems)) {
      return Box.create(wrapper, {
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
                      <Ref innerRef={this.measurementRef}>
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
      })
    }

    return renderedToolbar
  }
}

Toolbar.create = createShorthandFactory({ Component: Toolbar, mappedProp: 'content' })

/**
 * A Toolbar component displays grouped actions.
 */
export default withSafeTypeForAs<typeof Toolbar, ToolbarProps>(Toolbar)
