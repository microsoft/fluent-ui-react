import { Accessibility } from '../../interfaces'
import { KeyCodes } from '@uifabric/utilities'

const BasicMenuItemBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'presentation',
    },
    anchor: {
      role: 'menuitem',
      'aria-expanded': props['submenuOpened'],
      'data-is-focusable': true,
    },
  },

  actionsDefinition: {
    closeSubmenuAndFocusCurrent: {
      keyCombinations: [{ keyCode: KeyCodes.escape }],
    },
    closeSubmenuAndFocusSibling: {
      keyCombinations: [{ keyCode: KeyCodes.right }, { keyCode: KeyCodes.left }],
    },
    openSubmenuAndFocusFirst: {
      keyCombinations: [
        { keyCode: KeyCodes.enter },
        { keyCode: KeyCodes.space },
        { keyCode: KeyCodes.down },
        { keyCode: KeyCodes.up },
      ],
    },
    openSubmenuAndFocusLast: {
      keyCombinations: [{ keyCode: KeyCodes.up }],
    },
    triggerClick: {
      keyCombinations: [{ keyCode: KeyCodes.enter }, { keyCode: KeyCodes.space }],
    },
  },
})

export default BasicMenuItemBehavior
