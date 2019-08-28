import { Accessibility } from '../../types'
import selectableListBehavior from './selectableListBehavior'
import basicListBehavior from './basicListBehavior'

/**
 * @description
 * Defines a behavior 'BasicListBehavior' or 'SelectableListBehavior' based on property 'selectable'.
 */
const ListBehavior: Accessibility<ListBehaviorProps> = props =>
  props.selectable ? selectableListBehavior(props) : basicListBehavior(props)

export default ListBehavior

export type ListBehaviorProps = {
  /** Indicates if a list is a selectable list. */
  selectable?: boolean

  /** Indicates if the list is horizontal. */
  horizontal?: boolean

  /** Indicates if any item of the list is in focus */
  isItemFocused?: boolean
}
