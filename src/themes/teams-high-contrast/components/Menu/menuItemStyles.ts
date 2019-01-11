import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { MenuVariables } from './menuVariables'
import { MenuItemProps, MenuItemState } from '../../../../components/Menu/MenuItem'

type MenuItemPropsAndState = MenuItemProps & MenuItemState

const menuItemStyles: ComponentSlotStylesInput<MenuItemPropsAndState, MenuVariables> = {
  wrapper: ({ props, variables: v }): ICSSInJSStyle => {
    const { iconOnly, isFromKeyboard } = props

    return {
      ...(iconOnly && {
        // focus styles
        ...(isFromKeyboard && {
          color: v.activeColor,
          background: v.activeBackgroundColor,
        }),

        // hover styles
        ':hover': {
          color: v.activeColor,
          background: v.activeBackgroundColor,
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
