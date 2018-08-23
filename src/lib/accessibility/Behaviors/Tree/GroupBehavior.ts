import { Accessibility } from '../../interfaces'

/**
 * @description
 * The GroupBehavior adds role='group'
 */

const GroupBehavior: Accessibility = {
  attributes: {
    root: {
      role: 'group',
    },
  },
}

export default GroupBehavior
