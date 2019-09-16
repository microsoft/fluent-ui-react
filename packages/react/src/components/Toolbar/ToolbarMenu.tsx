import * as React from 'react'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'

import * as customPropTypes from '@stardust-ui/react-proptypes'

import {
  createShorthandFactory,
  commonPropTypes,
  UIComponent,
  childrenExist,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  ShorthandFactory,
} from '../../lib'
import { mergeComponentVariables } from '../../lib/mergeThemes'

import {
  ComponentEventHandler,
  ShorthandCollection,
  withSafeTypeForAs,
  ComponentMouseEventHandler,
} from '../../types'
import { submenuBehavior } from '../../lib/accessibility'

import ToolbarMenuDivider from './ToolbarMenuDivider'
import ToolbarMenuItem, { ToolbarMenuItemProps } from './ToolbarMenuItem'
import { PopupProps } from '../Popup/Popup'

export type ToolbarMenuItemShorthandKinds = 'divider' | 'item'

export interface ToolbarMenuProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /** Shorthand array of props for ToolbarMenu. */
  items?: ShorthandCollection<ToolbarMenuItemProps, ToolbarMenuItemShorthandKinds>

  /**
   * Called on item click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All item props.
   */
  onItemClick?: ComponentEventHandler<ToolbarMenuItemProps>

  /**
   * Event that occurs when a click is detected by `Popup` in a document.
   * @param {MouseEvent} event - React's original MouseEvent.
   * @param {object} data - All `Popup` props and an `outside` prop indicating whether the click was outside of `Popup`.
   */
  onPopupDocumentClick?: ComponentMouseEventHandler<PopupProps & { outside: boolean }>

  /**
   * Called when `Popup`'s open state changes.
   *
   * @param {SyntheticEvent} event - React's original SynteticEvent.
   * @param {object} data - All `Popup` props.
   */
  onPopupOpenChange?: ComponentEventHandler<PopupProps>
}

class ToolbarMenu extends UIComponent<ToolbarMenuProps> {
  static displayName = 'ToolbarMenu'

  static className = 'ui-toolbar__menu'

  static create: ShorthandFactory<ToolbarMenuProps>

  static propTypes = {
    ...commonPropTypes.createCommon(),
    items: customPropTypes.collectionShorthandWithKindProp(['divider', 'item']),
    onItemClick: PropTypes.func,
    onPopupDocumentClick: PropTypes.func,
    onPopupOpenChange: PropTypes.func,
  }

  static defaultProps = {
    accessibility: submenuBehavior,
    as: 'ul',
  }

  handleItemOverrides = variables => predefinedProps => ({
    onClick: (e, itemProps) => {
      _.invoke(predefinedProps, 'onClick', e, itemProps)
      _.invoke(this.props, 'onItemClick', e, itemProps)
    },
    variables: mergeComponentVariables(variables, predefinedProps.variables),
  })

  handleDividerOverrides = variables => predefinedProps => ({
    variables: mergeComponentVariables(variables, predefinedProps.variables),
  })

  renderItems(items, variables) {
    const itemOverridesFn = this.handleItemOverrides(variables)
    const dividerOverridesFn = this.handleDividerOverrides(variables)

    return _.map(items, item => {
      const kind = _.get(item, 'kind', 'item')
      if (kind === 'divider') {
        return ToolbarMenuDivider.create(item, { overrideProps: dividerOverridesFn })
      }
      return ToolbarMenuItem.create(item, {
        overrideProps: itemOverridesFn,
        defaultProps: {
          onPopupDocumentClick: this.handlePopupDocumentClick,
          onPopupOpenChange: this.handlePopupOpenChange,
        },
      })
    })
  }

  handlePopupDocumentClick = (e: MouseEvent, data) => {
    _.invoke(this.props, 'onPopupDocumentClick', e, { ...this.props, outside: data.outside })
  }

  handlePopupOpenChange = (e: React.SyntheticEvent, data) => {
    _.invoke(this.props, 'onPopupOpenChange', e, data)
  }

  renderComponent({ ElementType, classes, accessibility, variables, unhandledProps }) {
    const { children, items } = this.props
    return (
      <ElementType className={classes.root} {...accessibility.attributes.root} {...unhandledProps}>
        {childrenExist(children) ? children : this.renderItems(items, variables)}
      </ElementType>
    )
  }
}

ToolbarMenu.create = createShorthandFactory({ Component: ToolbarMenu, mappedArrayProp: 'items' })

/**
 * A ToolbarMenu creates a pop-up menu attached to a ToolbarItem.
 *
 * @accessibility
 * Implements pop-up menu (submenu) behavior of [ARIA Menu](https://www.w3.org/TR/wai-aria-practices-1.1/#menu) design pattern.
 */
export default withSafeTypeForAs<typeof ToolbarMenu, ToolbarMenuProps, 'ul'>(ToolbarMenu)
