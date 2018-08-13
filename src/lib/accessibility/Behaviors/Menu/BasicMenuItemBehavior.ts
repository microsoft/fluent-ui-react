import { Accessibility } from '../../interfaces'
import { KeyCodes } from '../../../KeyCodes'

const BasicMenuItemBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'presentation',
    },
    anchor: {
      role: 'menuitem',
      'aria-expanded': props['submenuOpened'],
      tabIndex: '0',
    },
  },

  actionsDefinition: {
    closeSubmenu: {
      keyCombinations: [
        { keyCode: KeyCodes.escape },
        { keyCode: KeyCodes.right },
        { keyCode: KeyCodes.left },
      ],
    },
    toggleSubmenu: {
      keyCombinations: [{ keyCode: KeyCodes.enter }, { keyCode: KeyCodes.space }],
    },
    openSubmenu: {
      keyCombinations: [
        { keyCode: KeyCodes.enter },
        { keyCode: KeyCodes.space },
        { keyCode: KeyCodes.down },
      ],
    },
    openSubmenuAndFocusLast: {
      keyCombinations: [{ keyCode: KeyCodes.up }],
    },
  },
})

export default BasicMenuItemBehavior
