import * as React from 'react'

import {
  ChildrenComponentProps,
  ContentComponentProps,
  createShorthandFactory,
  UIComponentProps,
  UIComponent,
  childrenExist,
  commonPropTypes,
} from '../../lib'
import { WithAsProp, withSafeTypeForAs } from '../../types'

import {
  collectionShorthandToolbarItem,
  renderToolbarItems,
  ToolbarItemShorthandCollection,
} from './renderToolbarItems'
import { Accessibility } from '../../lib/accessibility/types'
import { defaultBehavior } from '../../lib/accessibility'

export interface ToolbarGroupProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility

  items?: ToolbarItemShorthandCollection
}

class ToolbarGroup extends UIComponent<WithAsProp<ToolbarGroupProps>> {
  static displayName = 'ToolbarGroup'

  static className = 'ui-toolbars' // FIXME: required by getComponentInfo/isConformant. But this is group inside a toolbar not a group of toolbars

  static create: Function

  static propTypes = {
    ...commonPropTypes.createCommon(),
    items: collectionShorthandToolbarItem(),
  }

  static defaultProps = {
    accessibility: defaultBehavior as Accessibility,
  }

  renderComponent({ ElementType, classes, accessibility, unhandledProps }) {
    const { children, items } = this.props
    return (
      <ElementType
        style={{ outline: '1px solid blue' }}
        {...accessibility.attributes.root}
        {...unhandledProps}
        className={classes.root}
      >
        {childrenExist(children) ? children : renderToolbarItems(items)}
      </ElementType>
    )
  }
}

ToolbarGroup.create = createShorthandFactory({ Component: ToolbarGroup, mappedProp: 'content' })

/**
 * Toolbar group.
 * TODO: add meaningful description
 */
export default withSafeTypeForAs<typeof ToolbarGroup, ToolbarGroupProps>(ToolbarGroup)
