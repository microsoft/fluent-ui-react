import { Accessibility } from '../../interfaces'
import SelectableListBehavior from './SelectableListBehavior'
import BasicListBehavior from './BasicListBehavior'

const ListBehavior: Accessibility = (props: any) =>
  props.selection ? SelectableListBehavior : BasicListBehavior

export default ListBehavior
