import { Accessibility } from '../../interfaces'

const MenuButtonBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'button',
      'aria-hidden': false,
      'aria-haspopup': true,
      'aria-expanded': false,
    },
  },
})

export default MenuButtonBehavior
