import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'
import * as _ from 'lodash'

/**
 * @description
 * The behavior is designed for particular structure of menu item. The item consists of root element and anchor inside the root element.
 *
 * @specification
 * Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'wrapper'.
 */

const navigableListItemBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      tabIndex: '0',
      'aria-label': 'test',
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
