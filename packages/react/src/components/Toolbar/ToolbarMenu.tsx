import * as React from 'react'
import * as _ from 'lodash'
import * as customPropTypes from '@stardust-ui/react-proptypes'

import { createShorthandFactory, commonPropTypes, UIComponent, childrenExist } from '../../lib'
import { mergeComponentVariables } from '../../lib/mergeThemes'

import { ShorthandCollection, withSafeTypeForAs } from '../../types'
import { submenuBehavior } from '../../lib/accessibility'

import ToolbarMenuItem from './ToolbarMenuItem'

export type ToolbarMenuItemShorthandKinds = 'divider' | 'item'

export interface ToolbarMenuProps {
  /** Shorthand array of props for ToolbarMenu. */
  items?: ShorthandCollection<ToolbarMenuItemShorthandKinds>
}

class ToolbarMenu extends UIComponent<ToolbarMenuProps> {
  static displayName = 'ToolbarMenu'

  static className = 'ui-toolbar__menu'

  static create: Function

  static propTypes = {
    ...commonPropTypes.createCommon(),
    items: customPropTypes.collectionShorthandWithKindProp(['divider', 'item']),
  }

  static defaultProps = {
    accessibility: submenuBehavior,
  }

  handleItemOverrides = variables => predefinedProps => ({
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

ToolbarMenu.create = createShorthandFactory({ Component: ToolbarMenu, mappedProp: 'items' })

/**
 * Toolbar menu creates a popup menu attached to a toolbarItem.
 */
export default withSafeTypeForAs<typeof ToolbarMenu, ToolbarMenuProps>(ToolbarMenu)
