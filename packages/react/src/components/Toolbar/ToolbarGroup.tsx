import * as React from 'react'

import {
  ChildrenComponentProps,
  ContentComponentProps,
  createShorthandFactory,
  UIComponentProps,
  UIComponent,
  childrenExist,
} from '../../lib'
import { WithAsProp, withSafeTypeForAs } from '../../types'

import { renderToolbarItems, ToolbarItemShorthandCollection } from './renderToolbarItems'

export interface ToolbarGroupProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  items?: ToolbarItemShorthandCollection
}

class ToolbarGroup extends UIComponent<WithAsProp<ToolbarGroupProps>> {
  static displayName = 'ToolbarGroup'

  static className = 'ui-toolbar__group'

  static create: Function

  renderComponent({ ElementType }) {
    const { children, items } = this.props
    return (
      <ElementType style={{ outline: '1px solid blue' }}>
        {childrenExist(children) ? children : renderToolbarItems(items)}
      </ElementType>
    )
  }
}

ToolbarGroup.create = createShorthandFactory({ Component: ToolbarGroup, mappedProp: 'content' })

export default withSafeTypeForAs<typeof ToolbarGroup, ToolbarGroupProps>(ToolbarGroup)
