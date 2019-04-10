import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { MenuVariables } from '../../../teams/components/Menu/menuVariables'
import { MenuItemProps, MenuItemState } from '../../../../components/Menu/MenuItem'

type MenuItemPropsAndState = MenuItemProps & MenuItemState

const menuItemStyles: ComponentSlotStylesInput<MenuItemPropsAndState, MenuVariables> = {
  wrapper: ({ props: p, variables: v }): ICSSInJSStyle => {
    const { iconOnly, isFromKeyboard, vertical, active, underlined, primary, pointing } = p

    return {
      ':hover': {
        color: v.activeColor,
        ...(!active && {
          background: v.focusedBackgroundColor,
        }),
      },

      ...(active && {
        background: v.activeBackgroundColor,
        color: v.activeColor,
      }),

      ...((iconOnly || vertical) && {
        ...(isFromKeyboard && {
          color: v.activeColor,
          background: v.focusedBackgroundColor,
        }),

        ...(active && {
          color: v.activeColor,
          background: v.activeBackgroundColor,
        }),

        ':hover': {
          color: v.activeColor,
          background: v.focusedBackgroundColor,
        },
      }),

      ...((underlined || primary) && {
        ...(!active && {
          ':hover': {
            color: v.color,
          },
        }),
      }),

      ...(pointing &&
        vertical && {
          '::before': {
            display: 'none',
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
