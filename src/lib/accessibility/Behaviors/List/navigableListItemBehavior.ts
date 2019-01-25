import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'
import * as _ from 'lodash'

/**
 * @description
 * The behavior is used as complementary role for 'navigableListBehavior'.
 * @specification
 * Adds role 'listitem' to 'wrapper' component's part.
 * Adds attribute 'tabIndex=0' to 'root' component's part.
 * Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'wrapper'.
 */

const navigableListItemBehavior: Accessibility = (props: any) => ({
  attributes: {
    wrapper: {
      role: 'listitem',
    },
    root: {
      tabIndex: '0',
    },
  },

  keyActions: {
    wrapper: {
      performClick: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: keyboardKey.Spacebar }],
      },
    },
  },
})

export default navigableListItemBehavior
