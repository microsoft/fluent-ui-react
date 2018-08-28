import { Accessibility } from '../../interfaces'
import SelectableListBehavior from './SelectableListBehavior'
import BasicListBehavior from './BasicListBehavior'

/**
 * @description
 * The ListBehavior defines a behavior "BasicListBehavior" or "SelectableListBehavior" based on "selection" property.
 */

const ListBehavior: Accessibility = (props: any) =>
  props.selection ? SelectableListBehavior : BasicListBehavior

export default ListBehavior
