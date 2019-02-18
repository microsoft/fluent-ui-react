import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { MenuVariables } from './menuVariables'
import { MenuItemProps, MenuItemState } from '../../../../components/Menu/MenuItem'

type MenuItemPropsAndState = MenuItemProps & MenuItemState

const menuItemStyles: ComponentSlotStylesInput<MenuItemPropsAndState, MenuVariables> = {
  wrapper: ({ props, variables }): ICSSInJSStyle => {
    const { iconOnly, isFromKeyboard, vertical, active } = props

    return {
      ...((iconOnly || vertical) && {
        // focus styles
        ...(isFromKeyboard && {
          color: variables.activeColor,
          background: variables.activeBackgroundColor,
        }),

        ...(active && {
          color: variables.activeColor,
          background: variables.selectedBackgroundColor,
        }),

        // hover styles
        ':hover': {
          color: variables.activeColor,
          background: variables.activeBackgroundColor,
        },
      }),
    }
  },

  root: ({ props }): ICSSInJSStyle => {
    const { iconOnly, isFromKeyboard } = props

    return {
      // focus styles
      ...(isFromKeyboard &&
        iconOnly && {
          borderColor: 'transparent',
        }),
    }
  },
}

export default menuItemStyles
