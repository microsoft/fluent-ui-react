import { Accessibility } from '@stardust-ui/react'

import { MenuButtonProps, MenuButtonState } from './MenuButton'

const menuButtonBehavior: Accessibility = (props: MenuButtonProps & MenuButtonState) => ({
  attributes: {
    button: {
      'aria-controls': props.menuId, // TODO: consder using aria-owns
      'aria-expanded': props.menuOpen || undefined,
      'aria-haspopup': 'true',
      id: props.buttonId,
      tabIndex: props.menuOpen ? -1 : undefined,
    },
    menu: {
      'aria-labelledby': props.buttonId,
      id: props.menuId,
    },
    menuItem: {
      tabIndex: -1,
      wrapper: {
        role: 'none',
      },
    },
  },
})

export default menuButtonBehavior
