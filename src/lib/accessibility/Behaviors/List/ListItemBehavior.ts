import SelectableListItemBehavior from './SelectableListItemBehavior'
import BasicListItemBehavior from './BasicListItemBehavior'
import { IAccessibilityDefinition } from '../../interfaces'

/**
 * @description
 * Defines a behavior "BasicListItemBehavior" or "SelectableListItemBehavior" based on "selection" property.
 */

const ListItemBehavior: (props: any) => IAccessibilityDefinition = (props: any) =>
  props.selection ? SelectableListItemBehavior(props) : BasicListItemBehavior

export default ListItemBehavior
