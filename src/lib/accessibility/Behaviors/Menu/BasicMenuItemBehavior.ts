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
      tabIndex: props['tabIndex'] === 0 ? '0' : '-1',
      'data-is-focusable': true,
    },
  },

  actionsDefinition: {
    cancelAction: {
      keyCombinations: [
        { keyCode: KeyCodes.escape },
        { keyCode: KeyCodes.right },
        { keyCode: KeyCodes.left },
      ],
    },
    triggerAction: {
      keyCombinations: [
        { keyCode: KeyCodes.enter },
        { keyCode: KeyCodes.space },
        { keyCode: KeyCodes.down },
        { keyCode: KeyCodes.up },
      ],
    },
  },
})

export default BasicMenuItemBehavior
