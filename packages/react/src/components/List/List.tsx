import { Accessibility, listBehavior } from '@stardust-ui/accessibility'
import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as _ from 'lodash'
import * as React from 'react'
import * as PropTypes from 'prop-types'

import {
  childrenExist,
  AutoControlledComponent,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
  applyAccessibilityKeyHandlers,
  createShorthandFactory,
  ShorthandFactory,
} from '../../lib'
import ListItem, { ListItemProps } from './ListItem'
import Box, { BoxProps } from '../Box/Box'
import {
  WithAsProp,
  ComponentEventHandler,
  withSafeTypeForAs,
  ShorthandCollection,
  ShorthandValue,
} from '../../types'

export interface ListSlotClassNames {
  item: string
}

export interface ListProps extends UIComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility

  /** Toggle debug mode */
  debug?: boolean

  /** Shorthand array of props for ListItem. */
  items?: ShorthandCollection<ListItemProps>

  /** A selectable list formats list items as possible choices. */
  selectable?: boolean

  /** A navigable list allows user to navigate through items. */
  navigable?: boolean

  /** Index of the currently selected item. */
  selectedIndex?: number

  /** Initial selectedIndex value. */
  defaultSelectedIndex?: number

  /**
   * Event for request to change 'selectedIndex' value.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onSelectedIndexChange?: ComponentEventHandler<ListProps>

  /** Truncates content */
  truncateContent?: boolean

  /** Truncates header */
  truncateHeader?: boolean

  /** A horizontal list displays elements horizontally. */
  horizontal?: boolean

  /** An optional conainer that wraps items or children if they are present. */
  container?: ShorthandValue<BoxProps>
}

export interface ListState {
  selectedIndex?: number
}

class List extends AutoControlledComponent<WithAsProp<ListProps>, ListState> {
  static displayName = 'List'

  static className = 'ui-list'

  static slotClassNames: ListSlotClassNames = {
    item: `${List.className}__item`,
  }

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    container: customPropTypes.itemShorthand,
    debug: PropTypes.bool,
    items: customPropTypes.collectionShorthand,
    selectable: customPropTypes.every([customPropTypes.disallow(['navigable']), PropTypes.bool]),
    navigable: customPropTypes.every([customPropTypes.disallow(['selectable']), PropTypes.bool]),
    truncateContent: PropTypes.bool,
    truncateHeader: PropTypes.bool,
    selectedIndex: PropTypes.number,
    defaultSelectedIndex: PropTypes.number,
    onSelectedIndexChange: PropTypes.func,
    horizontal: PropTypes.bool,
  }

  static defaultProps = {
    as: 'ul',
    accessibility: listBehavior as Accessibility,
  }

  static autoControlledProps = ['selectedIndex']

  getInitialAutoControlledState() {
    return { selectedIndex: -1 }
  }

  static Item = ListItem

  // List props that are passed to each individual Item props
  static itemProps = [
    'debug',
    'selectable',
    'navigable',
    'truncateContent',
    'truncateHeader',
    'variables',
  ]

  static create: ShorthandFactory<ListProps>

  handleItemOverrides = (predefinedProps: ListItemProps) => {
    const { selectable } = this.props

    return {
      onClick: (e: React.SyntheticEvent, itemProps: ListItemProps) => {
        _.invoke(predefinedProps, 'onClick', e, itemProps)

        if (selectable) {
          this.setState({ selectedIndex: itemProps.index })
          _.invoke(this.props, 'onSelectedIndexChange', e, {
            ...this.props,
            ...{ selectedIndex: itemProps.index },
          })
        }
      },
    }
  }

  renderComponent({ ElementType, classes, accessibility, unhandledProps }) {
    const { children, container, items } = this.props

    const hasContent = childrenExist(children) || (items && items.length > 0)
    const containerContent = childrenExist(children) ? children : this.renderItems()

    const maybeWrappedContent =
      hasContent && container
        ? Box.create(container, { overrideProps: { children: containerContent } })
        : containerContent

    return (
      <ElementType
        {...accessibility.attributes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
        className={classes.root}
      >
        {maybeWrappedContent}
      </ElementType>
    )
  }

  renderItems() {
    const { items, selectable } = this.props
    const { selectedIndex } = this.state

    return _.map(items, (item, index) => {
      const maybeSelectableItemProps = {} as any

      if (selectable) {
        maybeSelectableItemProps.selected = index === selectedIndex
      }

      const itemProps = () => ({
        className: List.slotClassNames.item,
        ..._.pick(this.props, List.itemProps),
        ...maybeSelectableItemProps,
        index,
      })

      return ListItem.create(item, {
        defaultProps: itemProps,
        overrideProps: this.handleItemOverrides,
      })
    })
  }
}

List.create = createShorthandFactory({ Component: List, mappedArrayProp: 'items' })

/**
 * A List displays a group of related sequential items.
 *
 * @accessibility
 * List may follow one of the following accessibility semantics:
 * - Static non-navigable list. Implements [ARIA list](https://www.w3.org/TR/wai-aria-1.1/#list) role.
 * - Selectable list: allows the user to select item from a list of choices. Implements [ARIA Listbox](https://www.w3.org/TR/wai-aria-practices-1.1/#Listbox) design pattern.
 */
export default withSafeTypeForAs<typeof List, ListProps, 'ul'>(List)
