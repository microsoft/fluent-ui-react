import { Accessibility } from '../../interfaces'

const MenuItemBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'presentation',
    },
    anchor: {
      role: 'menuitem',
      'aria-expanded': props['aria-expanded'] || props['submenuOpened'],
      tabIndex: '0',
      'aria-label': props['aria-label'],
      'aria-labelledby': props['aria-labelledby'],
    },
  },
  handledProps: ['aria-label', 'aria-labelledby', 'aria-expanded'],
})

export default MenuItemBehavior
