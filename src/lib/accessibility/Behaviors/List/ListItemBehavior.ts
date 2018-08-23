import SelectableListItemBehavior from './SelectableListItemBehavior'
import BasicListItemBehavior from './BasicListItemBehavior'
import { IAccessibilityDefinition } from '../../interfaces'

const ListItemBehavior: (props: any) => IAccessibilityDefinition = (props: any) =>
  props.selection ? SelectableListItemBehavior(props) : BasicListItemBehavior

export default ListItemBehavior
