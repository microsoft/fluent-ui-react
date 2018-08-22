import { Accessibility } from '../../interfaces'
import BasicMenuBehavior from './BasicMenuBehavior'
import VerticalMenuBehavior from './VerticalMenuBehavior'

const MenuBehavior: Accessibility = (props: any) =>
  props.vertical ? VerticalMenuBehavior : BasicMenuBehavior

export default MenuBehavior
