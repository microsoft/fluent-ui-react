import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { ToolbarItemProps, ToolbarItemState } from '../../../../components/Toolbar/ToolbarItem'
import { ToolbarVariables } from './toolbarVariables'
import getIconFillOrOutlineStyles from '../../getIconFillOrOutlineStyles'
import { getColorScheme } from '../../colors'
import { pxToRem } from '@stardust-ui/react'

type ToolbarItemPropsAndState = ToolbarItemProps & ToolbarItemState

const toolbarItemStyles: ComponentSlotStylesInput<ToolbarItemPropsAndState, ToolbarVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const { active, disabled, isFromKeyboard } = p
    const colors = getColorScheme(v.colorScheme)

    return {
      backgroundColor: v.background,
      borderWidth: v.borderWidth,
      borderStyle: 'solid',
      borderColor: 'transparent',
      borderRadius: v.borderRadius,
      height: v.itemHeight,
      minWidth: v.itemHeight,
      color: v.foreground || colors.foreground1,
      cursor: 'pointer',

      ':focus': {
        outline: 0,
      },

      ...(active && {
        color: v.foregroundActive || colors.foregroundActive,
        backgroundColor: v.backgroundActive,
        ...getIconFillOrOutlineStyles({ outline: false }),
      }),

      ':hover': {
        color: v.foregroundHover || colors.foregroundHover,
        backgroundColor: v.backgroundHover || colors.backgroundHover,
        ...getIconFillOrOutlineStyles({ outline: false }),
      },

      ...(isFromKeyboard && {
        color: v.foregroundFocus || colors.foregroundFocus,
        backgroundColor: v.backgroundFocus || colors.backgroundFocus,
        borderColor: v.borderFocus || colors.borderFocus,
        ...getIconFillOrOutlineStyles({ outline: false }),
      }),

      ...(disabled && {
        color: v.foregroundDisabled || colors.foregroundDisabled1,
        backgroundColor: v.backgroundDisabled,
        cursor: 'default',
        ':hover': {
          // empty to overwrite all existing hover styles
        },
      }),
    }
  },
}

export default toolbarItemStyles
