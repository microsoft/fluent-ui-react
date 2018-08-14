import { Accessibility } from '../../interfaces'

const VerticalMenuItemBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'menuitem',
      'data-is-focusable': true,
      'aria-expanded': props['submenuOpened'],
    },
  },
})

export default VerticalMenuItemBehavior
