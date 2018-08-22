import { Accessibility } from '../../interfaces'
import { KeyCodes } from '@uifabric/utilities'

const VerticalMenuItemBehavior: Accessibility = (props: any) => ({
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
    triggerClick: {
      keyCombinations: [{ keyCode: KeyCodes.enter }, { keyCode: KeyCodes.space }],
    },
  },
})

export default VerticalMenuItemBehavior
