import * as React from 'react'

import {
  UIComponent,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  childrenExist,
} from '../../lib'
import { ShorthandValue, WithAsProp, withSafeTypeForAs } from '../../types'
import { Accessibility } from '../../lib/accessibility/types'
import Icon from '../Icon/Icon'
import * as customPropTypes from '@stardust-ui/react-proptypes'

export interface ToolbarItemProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default menuItemBehavior
   * @available toolbarButtonBehavior, tabBehavior
   * */
  accessibility?: Accessibility

  /** Name or shorthand for Toolbar Item Icon */
  icon?: ShorthandValue
}

class ToolbarItem extends UIComponent<WithAsProp<ToolbarItemProps>> {
  static displayName = 'ToolbarItem'

  static className = 'ui-toolbar__item'

  static create: Function

  static propTypes = {
    ...commonPropTypes.createCommon(),
    icon: customPropTypes.itemShorthand,
  }

  static defaultProps = {
    as: 'button',
  }

  renderComponent({ ElementType }) {
    const { icon, children } = this.props
    return <ElementType>{childrenExist(children) ? children : Icon.create(icon)}</ElementType>
  }
}

ToolbarItem.create = createShorthandFactory({ Component: ToolbarItem, mappedProp: 'content' })

export default withSafeTypeForAs<typeof ToolbarItem, ToolbarItemProps, 'button'>(ToolbarItem)
