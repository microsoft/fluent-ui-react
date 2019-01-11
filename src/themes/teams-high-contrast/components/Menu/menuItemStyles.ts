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
  }
}

const menuItemStyles: ComponentSlotStylesInput<MenuItemPropsAndState, MenuVariables> = {
  wrapper: ({ props, variables }): ICSSInJSStyle => {
    const { iconOnly, isFromKeyboard } = props

    return {
      // focus styles
      ...(isFromKeyboard && iconOnly && getIconOnlyFocusedAndHoverStyles({ variables })),

      // hover styles
      ':hover': {
        ...(iconOnly && getIconOnlyFocusedAndHoverStyles({ variables })),
      },
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
