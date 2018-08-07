import { IAccessibilityFunc } from '../../interfaces'
import SelectableListItemBehavior from './SelectableListItemBehavior'
import BasicListItemBehavior from './BasicListItemBehavior'

const ListItemBehavior: IAccessibilityFunc = (props: any) =>
  props.selection ? SelectableListItemBehavior(props) : BasicListItemBehavior

export default ListItemBehavior
