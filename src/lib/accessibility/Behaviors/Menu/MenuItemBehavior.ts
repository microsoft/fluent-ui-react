import { Accessibility } from '../../interfaces'
import { KeyCodes } from '../../../KeyCodes'

const MenuItemBehavior: Accessibility = (props: any) => ({
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
      keyCombinations: [{ keyCode: KeyCodes.escape }],
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

export default MenuItemBehavior
