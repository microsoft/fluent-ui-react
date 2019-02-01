import selectableListItemBehavior from './selectableListItemBehavior'
import basicListItemBehavior from './basicListItemBehavior'
import { Accessibility } from '../../types'

/**
 * @description
 * Defines a behavior "BasicListItemBehavior" or "SelectableListItemBehavior" based on "selectable" property.
 */

const listItemBehavior: Accessibility = (props: any) =>
  props.selectable ? selectableListItemBehavior(props) : basicListItemBehavior(props)

export default listItemBehavior
