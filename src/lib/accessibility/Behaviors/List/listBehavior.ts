import { Accessibility } from '../../interfaces'
import selectableListBehavior from './selectableListBehavior'
import basicListBehavior from './BasicListBehavior'

/**
 * @description
 * Defines a behavior "BasicListBehavior" or "SelectableListBehavior" based on "selection" property.
 */

const ListBehavior: Accessibility = (props: any) =>
  props.selection ? selectableListBehavior(props) : basicListBehavior(props)

export default ListBehavior
