import * as React from 'react'

import { ReactProps } from '../../../types/utils'
import {
  commonPropTypes,
  ContentComponentProps,
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
} from '../../lib'
import ListItem from '../List/ListItem'

export interface DropdownMessageLoadingProps
  extends UIComponentProps<DropdownMessageLoadingProps>,
    ContentComponentProps {}

/**
 * A DropdownMessageLoading is a sub-component that outputs a message when the Dropdown is loading.
 */
class DropdownMessageLoading extends UIComponent<ReactProps<DropdownMessageLoadingProps>> {
  static className = 'ui-dropdown__message-loading'
  static create: Function
  static displayName = 'DropdownMessageLoading'
  static propTypes = commonPropTypes.createCommon({ children: false })

  renderComponent({ classes, ElementType, unhandledProps }) {
    const { content } = this.props

    return <ListItem className={classes.root} content={content} {...unhandledProps} />
  }
}

DropdownMessageLoading.create = createShorthandFactory(DropdownMessageLoading, 'content')

export default DropdownMessageLoading
