import { Accessibility } from '../../interfaces'

const MenuItemBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'presentation',
    },
    anchor: {
      role: 'menuitem',
      tabIndex: '0',
      'aria-label': props['aria-label'],
      'aria-labelledby': props['aria-labelledby'],
    },
  },
  handledProps: ['aria-label', 'aria-labelledby', 'aria-expanded'],
})

export default MenuItemBehavior
