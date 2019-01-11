import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { MenuVariables } from './menuVariables'
import { MenuItemProps, MenuItemState } from '../../../../components/Menu/MenuItem'

type MenuItemPropsAndState = MenuItemProps & MenuItemState

const getIconOnlyFocusedAndHoverStyles = ({
  variables,
}: {
  variables: MenuVariables
}): ICSSInJSStyle => {
  return {
    color: variables.activeColor,
    background: variables.activeBackgroundColor,
    borderRadius: 'unset', // override from Teams default theme
  }
}

const menuItemStyles: ComponentSlotStylesInput<MenuItemPropsAndState, MenuVariables> = {
  root: ({ props, variables, theme }): ICSSInJSStyle => {
    const { iconOnly, isFromKeyboard } = props

    return {
      // focus styles
      ...(isFromKeyboard && {
        ...(iconOnly && getIconOnlyFocusedAndHoverStyles({ variables })),
      }),

      // hover styles
      ':hover': {
        ...(iconOnly && getIconOnlyFocusedAndHoverStyles({ variables })),
      },
    }
  },
}

export default menuItemStyles
