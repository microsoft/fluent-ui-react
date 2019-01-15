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

export interface DropdownMessageNoResultsProps
  extends UIComponentProps<DropdownMessageNoResultsProps>,
    ContentComponentProps {}

/**
 * A DropdownMessageNoResults is a sub-component that outputs a message when a list of filtered
 * items is empty.
 */
class DropdownMessageNoResults extends UIComponent<ReactProps<DropdownMessageNoResultsProps>> {
  static className = 'ui-dropdown__message-no-results'
  static create: Function
  static displayName = 'DropdownMessageNoResults'
  static propTypes = commonPropTypes.createCommon({ children: false })

  renderComponent({ classes, ElementType, unhandledProps }) {
    const { content } = this.props

    return <ListItem className={classes.root} content={content} {...unhandledProps} />
  }
}

DropdownMessageNoResults.create = createShorthandFactory(DropdownMessageNoResults, 'content')

export default DropdownMessageNoResults
