import { Accessibility } from '../../interfaces'
import SelectableListBehavior from './SelectableListBehavior'
import BasicListBehavior from './BasicListBehavior'

/**
 * @description
 * Defines a behavior 'BasicListBehavior' or 'SelectableListBehavior' based on property 'selection'.
 */

const ListBehavior: Accessibility = (props: any) =>
  props.selection ? SelectableListBehavior : BasicListBehavior

export default ListBehavior
