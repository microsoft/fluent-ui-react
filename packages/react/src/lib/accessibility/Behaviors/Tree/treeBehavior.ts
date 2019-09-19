import * as keyboardKey from 'keyboard-key'
import { Accessibility, AccessibilityAttributes, FocusZoneMode } from '../../types'
import { FocusZoneDirection } from '../../FocusZone'
import treeItemBehavior from './treeItemBehavior'

/**
 * @specification
 * Adds role 'tree' to 'root' slot.
 * Adds attribute 'aria-labelledby' based on the property 'aria-labelledby' to 'root' slot.
 * Embeds component into FocusZone.
 * Provides arrow key navigation in vertical direction.
 * Triggers 'expandSiblings' action with '*' on 'root'.
 */
const treeBehavior: Accessibility<TreeBehaviorProps> = props => {
  return {
    attributes: {
      root: {
        role: 'tree',
        'aria-labelledby': props['aria-labelledby'],
      },
    },
    keyActions: {
      root: {
        expandSiblings: {
          keyCombinations: [{ keyCode: keyboardKey['*'] }],
        },
      },
    },
    focusZone: {
      mode: FocusZoneMode.Embed,
      props: {
        direction: FocusZoneDirection.vertical,
      },
    },
    childBehaviors: {
      item: treeItemBehavior,
    },
  }
}

type TreeBehaviorProps = Pick<AccessibilityAttributes, 'aria-labelledby'>

export default treeBehavior
