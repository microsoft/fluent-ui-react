import selectableListItemBehavior from './selectableListItemBehavior'
import basicListItemBehavior from './basicListItemBehavior'
import { Accessibility } from '../../types'

/**
 * @description
 * Defines a behavior "BasicListItemBehavior" or "SelectableListItemBehavior" based on "selection" property.
 */

const listItemBehavior: Accessibility = (props: any) =>
  props.selection ? selectableListItemBehavior(props) : basicListItemBehavior(props)

export default listItemBehavior
