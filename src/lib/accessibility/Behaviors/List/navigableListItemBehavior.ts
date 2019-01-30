import { Accessibility } from '../../types'
import * as _ from 'lodash'
import { menuItemBehavior } from '../..'

/**
 * @description
 * The behavior is used as complementary role for 'navigableListBehavior'.
 * @specification
 */

const navigableListItemBehavior: Accessibility = (props: any) => {
  const behavior = menuItemBehavior(props)
  behavior.attributes.wrapper = undefined
  behavior.attributes.root.role = 'listitem'
  return behavior
}

export default navigableListItemBehavior
