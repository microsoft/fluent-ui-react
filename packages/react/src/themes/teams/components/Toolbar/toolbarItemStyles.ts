import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { ToolbarItemProps } from '../../../../components/Toolbar/ToolbarItem'
import { ToolbarVariables } from './toolbarVariables'
import getIconFillOrOutlineStyles from '../../getIconFillOrOutlineStyles'
import { getColorScheme } from '../../colors'

const toolbarItemStyles: ComponentSlotStylesInput<ToolbarItemProps, ToolbarVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const colors = getColorScheme(v.colorScheme)

    return {
      backgroundColor: v.background,
      borderWidth: v.borderWidth,
      borderStyle: 'solid',
      borderColor: 'transparent',
      borderRadius: v.borderRadius,
      height: v.itemHeight,
      minWidth: v.itemHeight,
      padding: v.itemPadding,
      color: v.foreground || colors.foreground1,
      cursor: 'pointer',

      ':focus': {
        outline: 0,
      },

      ...(p.active && {
        color: v.foregroundActive || colors.foregroundActive,
        backgroundColor: v.backgroundActive,
        ...getIconFillOrOutlineStyles({ outline: false }),
      }),

      ':hover': {
        color: v.foregroundHover || colors.foregroundHover,
        backgroundColor: v.backgroundHover || colors.backgroundHover,
        ...getIconFillOrOutlineStyles({ outline: false }),
      },

      ':focus-visible': {
        color: v.foregroundFocus || colors.foregroundFocus,
        backgroundColor: v.backgroundFocus || colors.backgroundFocus,
        borderColor: v.borderFocus || colors.borderFocus,
        ...getIconFillOrOutlineStyles({ outline: false }),
      },

      ...(p.disabled && {
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
