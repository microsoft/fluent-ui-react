import { Accessibility } from '../../interfaces'
import SelectableListBehavior from './SelectableListBehavior'
import BasicListBehavior from './BasicListBehavior'

/**
 * @description
 * Defines a behavior "BasicListBehavior" or "SelectableListBehavior" based on "selection" property.
 */

const ListBehavior: Accessibility = (props: any) =>
  props.selection ? SelectableListBehavior(props) : BasicListBehavior(props)

export default ListBehavior
