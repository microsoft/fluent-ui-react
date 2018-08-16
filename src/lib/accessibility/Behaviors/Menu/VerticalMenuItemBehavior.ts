import { Accessibility } from '../../interfaces'

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

  actionsDefinition: {},
})

export default VerticalMenuItemBehavior
