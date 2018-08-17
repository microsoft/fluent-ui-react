import { Accessibility } from '../../interfaces'
import { KeyCodes } from '../../../KeyCodes'

const VerticalMenuItemBehavior: Accessibility = (props: any) => ({
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
      keyCombinations: [],
    },
    triggerAction: {
      keyCombinations: [{ keyCode: KeyCodes.enter }, { keyCode: KeyCodes.space }],
    },
  },
})

export default VerticalMenuItemBehavior
