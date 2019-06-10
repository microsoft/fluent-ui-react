import selectableListItemBehavior from './selectableListItemBehavior'
import basicListItemBehavior from './basicListItemBehavior'
import { Accessibility } from '../../types'

export type ListItemBehaviorProps = {
  /** Indicates if a list is a selectable list. */
  selectable?: boolean
  /** Indicates if the current list item is selected. */
  selected?: boolean
}

/**
 * @description
 * Defines a behavior "BasicListItemBehavior" or "SelectableListItemBehavior" based on "selectable" property.
 */
const listItemBehavior: Accessibility<ListItemBehaviorProps> = props =>
  props.selectable ? selectableListItemBehavior(props) : basicListItemBehavior(props)

export default listItemBehavior
