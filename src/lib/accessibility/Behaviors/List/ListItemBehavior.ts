import SelectableListItemBehavior from './SelectableListItemBehavior'
import BasicListItemBehavior from './BasicListItemBehavior'
import { IAccessibilityDefinition } from '../../interfaces'

/**
 * @description
 * The ListItemBehavior adds beharior SelectableListItemBehavior or BasicListItemBehavior based on "selection" property.
 */

const ListItemBehavior: (props: any) => IAccessibilityDefinition = (props: any) =>
  props.selection ? SelectableListItemBehavior(props) : BasicListItemBehavior

export default ListItemBehavior
