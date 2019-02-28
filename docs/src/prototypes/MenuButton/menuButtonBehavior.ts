import { Accessibility } from '@stardust-ui/react'
import * as _ from 'lodash'

import { MenuButtonProps, MenuButtonState } from './MenuButton'

const menuButtonBehavior: Accessibility = (props: MenuButtonProps & MenuButtonState) => ({
  attributes: {
    button: {
      'aria-disabled': !_.isNil(props['aria-disabled']) ? props['aria-disabled'] : !!props.disabled,
      'aria-controls': props.menuId,
      'aria-expanded': props.menuOpen || undefined,
      'aria-haspopup': 'true',
      id: props.buttonId,
      role: _.get(props, 'button.as') === 'button' ? undefined : 'button',
      tabIndex: props.menuOpen ? '-1' : undefined,
    },
    menu: {
      'aria-labelledby': props.buttonId,
      id: props.menuId,
    },
    menuItem: {
      tabIndex: '-1',
      wrapper: {
        role: 'none',
      },
    },
  },
})

export default menuButtonBehavior
