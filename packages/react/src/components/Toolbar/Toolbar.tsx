import * as React from 'react'

import {
  childrenExist,
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  ContentComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  ColorComponentProps,
} from '../../lib'
import { Accessibility } from '../../lib/accessibility/types'
import { defaultBehavior } from '../../lib/accessibility'
import { WithAsProp, withSafeTypeForAs } from '../../types'

import ToolbarItem from './ToolbarItem'
import ToolbarDivider from './ToolbarDivider'
import {
  collectionShorthandToolbarItem,
  renderToolbarItems,
  ToolbarItemShorthandCollection,
} from './renderToolbarItems'

export interface ToolbarProps
  extends UIComponentProps,
    ContentComponentProps,
    ChildrenComponentProps,
    ColorComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default defaultBehavior
   */
  accessibility?: Accessibility

  items?: ToolbarItemShorthandCollection
}

class Toolbar extends UIComponent<WithAsProp<ToolbarProps>, any> {
  static create: Function

  static className = 'ui-toolbar'

  static displayName = 'Toolbar'

  static propTypes = {
    ...commonPropTypes.createCommon(),
    items: collectionShorthandToolbarItem(),
  }

  static defaultProps = {
    accessibility: defaultBehavior,
  }

  static Item = ToolbarItem
  static Divider = ToolbarDivider

  renderComponent({ accessibility, ElementType, classes, unhandledProps }): React.ReactNode {
    const { children, items } = this.props

    return (
      <ElementType
        style={{ display: 'flex', outline: '1px solid salmon' }}
        className={classes.root}
        {...accessibility.attributes.root}
        {...unhandledProps}
      >
        {childrenExist(children) ? children : renderToolbarItems(items)}
      </ElementType>
    )
  }
}

Toolbar.create = createShorthandFactory({ Component: Toolbar, mappedProp: 'content' })

/**
 * A Toolbar component groups actions.
 * @accessibility
 * TODO
 */
export default withSafeTypeForAs<typeof Toolbar, ToolbarProps>(Toolbar)
