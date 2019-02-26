import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { MenuVariables } from './menuVariables'
import { MenuItemProps, MenuItemState } from '../../../../components/Menu/MenuItem'

type MenuItemPropsAndState = MenuItemProps & MenuItemState

const menuItemStyles: ComponentSlotStylesInput<MenuItemPropsAndState, MenuVariables> = {
  wrapper: ({ props, variables }): ICSSInJSStyle => {
    const { iconOnly, isFromKeyboard, vertical, active, underlined, primary } = props

    return {
      ':hover': {
        color: variables.activeColor,
        ...(!active && {
          background: variables.focusedBackgroundColor,
        }),
      },

      ...(active && {
        background: variables.activeBackgroundColor,
        color: variables.activeColor,
      }),

      ...((iconOnly || vertical) && {
        ...(isFromKeyboard && {
          color: variables.activeColor,
          background: variables.focusedBackgroundColor,
        }),

        ...(active && {
          color: variables.activeColor,
          background: variables.activeBackgroundColor,
        }),

        ':hover': {
          color: variables.activeColor,
          background: variables.focusedBackgroundColor,
        },
      }),

      ...((underlined || primary) && {
        ...(!active && {
          ':hover': {
            color: variables.color,
          },
        }),
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
