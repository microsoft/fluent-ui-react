import SelectableListItemBehavior from './SelectableListItemBehavior'
import BasicListItemBehavior from './BasicListItemBehavior'
import { Accessibility } from '../../interfaces'

/**
 * @description
 * Defines a behavior "BasicListItemBehavior" or "SelectableListItemBehavior" based on "selection" property.
 */

const ListItemBehavior: Accessibility = (props: any) =>
  props.selection ? SelectableListItemBehavior(props) : BasicListItemBehavior(props)

export default ListItemBehavior
