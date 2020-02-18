import { Accessibility, listBehavior, ListBehaviorProps } from '@fluentui/accessibility'
import {
  getElementType,
  getUnhandledProps,
  useAccessibility,
  useAutoControlled,
  useStyles,
  useTelemetry,
} from '@fluentui/react-bindings'
import * as customPropTypes from '@fluentui/react-proptypes'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
// @ts-ignore
import { ThemeContext } from 'react-fela'

import {
  WithAsProp,
  ComponentEventHandler,
  withSafeTypeForAs,
  ShorthandCollection,
  ReactChildren,
  ProviderContextPrepared,
  FluentComponentStaticProps,
} from '../../types'
import {
  childrenExist,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
  createShorthandFactory,
} from '../../utils'
import { ListContextProvider, ListContextValue } from './listContext'
import ListItem, { ListItemProps } from './ListItem'

export interface ListProps extends UIComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<ListBehaviorProps>

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
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onSelectedIndexChange?: ComponentEventHandler<ListProps>

  /** Truncates content */
  truncateContent?: boolean

  /** Truncates header */
  truncateHeader?: boolean

  /** A horizontal list displays elements horizontally. */
  horizontal?: boolean

  /** An optional wrapper function. */
  wrap?: (children: ReactChildren) => React.ReactNode
}

const List: React.FC<WithAsProp<ListProps>> &
  FluentComponentStaticProps<ListProps> & {
    Item: typeof ListItem
  } = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext)
  const { setStart, setEnd } = useTelemetry(List.displayName, context.telemetry)
  setStart()

  const {
    accessibility,
    as,
    children,
    className,
    debug,
    design,
    horizontal,
    items,
    navigable,
    selectable,
    styles,
    truncateContent,
    truncateHeader,
    variables,
    wrap,
  } = props

  const [selectedIndex, setSelectedIndex] = useAutoControlled({
    defaultValue: props.defaultSelectedIndex,
    value: props.selectedIndex,
    initialValue: -1,
  })
  const getA11Props = useAccessibility(accessibility, {
    debugName: List.displayName,
    mapPropsToBehavior: () => ({
      horizontal,
      navigable,
      selectable,
    }),
    rtl: context.rtl,
  })
  const { classes } = useStyles(List.displayName, {
    className: List.className,
    mapPropsToStyles: () => ({ isListTag: as === 'ol' || as === 'ul', debug, horizontal }),
    mapPropsToInlineStyles: () => ({ className, design, styles, variables }),
    rtl: context.rtl,
  })

  const latestProps = React.useRef<ListProps>(props)
  latestProps.current = props

  const ElementType = getElementType(props)
  const unhandledProps = getUnhandledProps(List.handledProps, props)

  const hasContent = childrenExist(children) || (items && items.length > 0)
  const onItemClick = React.useCallback(
    (e, itemIndex) => {
      if (selectable) {
        setSelectedIndex(itemIndex)
        _.invoke(latestProps.current, 'onSelectedIndexChange', e, {
          ...latestProps.current,
          selectedIndex: itemIndex,
        })
      }
    },
    [latestProps, setSelectedIndex],
  )

  const childProps: ListContextValue = {
    debug,
    navigable,
    onItemClick,
    selectable,
    selectedIndex,
    truncateContent,
    truncateHeader,
    variables,
  }
  const renderItems = () =>
    _.map(items, (item, index) => ListItem.create(item, { defaultProps: () => ({ index }) }))

  const element = getA11Props.unstable_wrapWithFocusZone(
    <ElementType
      {...getA11Props('root', {
        className: classes.root,
        ...rtlTextContainer.getAttributes({ forElements: [children] }),
        ...unhandledProps,
      })}
    >
      <ListContextProvider value={childProps}>
        {hasContent && wrap(childrenExist(children) ? children : renderItems())}
      </ListContextProvider>
    </ElementType>,
  )
  setEnd()

  return element
}

List.className = 'ui-list'
List.displayName = 'List'

List.defaultProps = {
  as: 'ul',
  accessibility: listBehavior,
  wrap: children => children,
}
List.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
  }),
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
  wrap: PropTypes.func,
}

List.handledProps = Object.keys(List.propTypes) as any
List.Item = ListItem

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
