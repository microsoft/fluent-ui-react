import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { MenuVariables } from '../../../teams/components/Menu/menuVariables'
import { MenuItemProps, MenuItemState } from '../../../../components/Menu/MenuItem'

type MenuItemPropsAndState = MenuItemProps & MenuItemState

const menuItemStyles: ComponentSlotStylesInput<MenuItemPropsAndState, MenuVariables> = {
  wrapper: ({ props: p, variables: v }): ICSSInJSStyle => {
    const { iconOnly, isFromKeyboard, vertical, active, underlined, primary, pointing } = p

    return {
      ':hover': {
        color: v.colorActive,
        ...(!active && {
          ...(primary && !underlined && { color: v.colorActive }),
          background: v.backgroundColorFocus,
        }),
      },

      ...(active &&
        !underlined && {
          background: v.backgroundColorActive,
          color: v.colorActive,
        }),

      ...((iconOnly || vertical) && {
        ...(isFromKeyboard && {
          color: v.colorActive,
          background: v.backgroundColorFocus,
        }),

        ...(active && {
          color: v.colorActive,
          background: v.backgroundColorActive,
        }),

        ':hover': {
          color: v.colorActive,
          background: v.backgroundColorFocus,
        },
      }),

      ...(underlined && {
        ...(active && {
          color: v.color,
        }),
        ':hover': {
          color: v.color,
        },
        ...(isFromKeyboard && {
          color: v.colorActive,
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
