import * as keyboardKey from 'keyboard-key'
import { IAccessibilityDefinition } from '../../interfaces'

/**
 * @description
 * Adds role='listitem'.
 * The 'listitem' role is used to identify an element that is a single item in a list.
 */

const BasicListItemBehavior: (props: any) => IAccessibilityDefinition = (props: any) => {
  return {
    attributes: {
      root: {
        role: 'listitem',
        tabIndex: props.atomicItemProps.isFocused ? '0' : '-1',
      },
    },
    keyActions: {
      root: {
        moveNext: {
          keyCombinations: [{ keyCode: keyboardKey.ArrowDown }],
        },
        movePrevious: {
          keyCombinations: [{ keyCode: keyboardKey.ArrowUp }],
        },
        moveFirst: {
          keyCombinations: [{ keyCode: keyboardKey.Home }],
        },
        moveLast: {
          keyCombinations: [{ keyCode: keyboardKey.End }],
        },
      },
    },
  }
}

export default BasicListItemBehavior
