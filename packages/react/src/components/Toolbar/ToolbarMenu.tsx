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
} from '../../lib'
import { mergeComponentVariables } from '../../lib/mergeThemes'

import { ComponentEventHandler, ShorthandCollection, withSafeTypeForAs } from '../../types'
import { submenuBehavior } from '../../lib/accessibility'

import ToolbarMenuItem, { ToolbarMenuItemProps } from './ToolbarMenuItem'

export type ToolbarMenuItemShorthandKinds = 'divider' | 'item'

export interface ToolbarMenuProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /** Shorthand array of props for ToolbarMenu. */
  items?: ShorthandCollection<ToolbarMenuItemShorthandKinds>

  onItemClick: ComponentEventHandler<ToolbarMenuItemProps>
}

class ToolbarMenu extends UIComponent<ToolbarMenuProps> {
  static displayName = 'ToolbarMenu'

  static className = 'ui-toolbar__menu'

  static create: Function

  static propTypes = {
    ...commonPropTypes.createCommon(),
    items: customPropTypes.collectionShorthandWithKindProp(['divider', 'item']),
    onItemClick: PropTypes.func,
  }

  static defaultProps = {
    accessibility: submenuBehavior,
  }

  handleItemOverrides = variables => predefinedProps => ({
    onClick: (e, itemProps) => {
      _.invoke(predefinedProps, 'onClick', e, itemProps)
      _.invoke(this.props, 'onItemClick', e, itemProps)
    },
    variables: mergeComponentVariables(variables, predefinedProps.variables),
  })

  renderItems(items, variables) {
    const itemOverridesFn = this.handleItemOverrides(variables)

    return _.map(items, item => {
      return ToolbarMenuItem.create(item, { overrideProps: itemOverridesFn })
    })
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
 * Toolbar menu creates a popup menu attached to a toolbarItem.
 */
export default withSafeTypeForAs<typeof ToolbarMenu, ToolbarMenuProps>(ToolbarMenu)
