import { Accessibility } from '../../interfaces'

const VerticalMenuItemBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'presentation',
    },
    anchor: {
      role: 'menuitem',
      'aria-expanded': props['submenuOpened'],
      tabIndex: '-1',
    },
  },

  actionsDefinition: {},
})

export default VerticalMenuItemBehavior
