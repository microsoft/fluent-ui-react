import { Accessibility } from '../../types'
import selectableListBehavior from './selectableListBehavior'
import basicListBehavior from './basicListBehavior'

/**
 * @description
 * Defines a behavior 'BasicListBehavior' or 'SelectableListBehavior' based on property 'selectable'.
 */

const ListBehavior: Accessibility = (props: any) =>
  props.selectable ? selectableListBehavior(props) : basicListBehavior(props)

export default ListBehavior
