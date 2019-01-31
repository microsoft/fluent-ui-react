import { Accessibility, menuItemBehavior } from '@stardust-ui/react'
import * as _ from 'lodash'

/**
 * @description
 * The behavior is used as complementary role for 'navigableListBehavior'.
 * @specification
 */

const chatParticipantBehavior: Accessibility = (props: any) => {
  const behavior = menuItemBehavior(props)
  behavior.attributes.wrapper = undefined
  behavior.attributes.root.role = 'listitem'
  return behavior
}

export default chatParticipantBehavior
