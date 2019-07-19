import * as keyboardKey from 'keyboard-key'
import { Accessibility } from '@stardust-ui/react'

const overridenTreeItemBehavior: Accessibility<TreeItemBehaviorProps> = props => {
  return {
    attributes: {
      root: {
        role: 'none',
        ...(props.items &&
          props.items.length && {
            'aria-expanded': props.open ? 'true' : 'false',
            tabIndex: -1,
            'data-is-focusable': true,
            role: 'treeitem',
          }),
      },
    },
    keyActions: {
      root: {
        performClickWithoutStoppingPropagation: {
          keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: keyboardKey.Spacebar }],
        },
        ...(isSubtreeOpen(props) && {
          receiveFocus: {
            keyCombinations: [{ keyCode: keyboardKey.ArrowLeft }],
          },
          collapse: {
            keyCombinations: [{ keyCode: keyboardKey.ArrowLeft }],
          },
          focusSubtree: {
            keyCombinations: [{ keyCode: keyboardKey.ArrowRight }],
          },
        }),
        ...(!isSubtreeOpen(props) && {
          expand: {
            keyCombinations: [{ keyCode: keyboardKey.ArrowRight }],
          },
        }),
      },
    },
  }
}

export type TreeItemBehaviorProps = {
  /** If item is a subtree, it contains items. */
  items?: object[]
  /** If item is a subtree, it indicates if it's open. */
  open?: boolean
}

/** Checks if current tree item has a subtree and it is opened */
const isSubtreeOpen = (props: TreeItemBehaviorProps): boolean => {
  const { items, open } = props
  return !!(items && items.length && open)
}

export default overridenTreeItemBehavior
