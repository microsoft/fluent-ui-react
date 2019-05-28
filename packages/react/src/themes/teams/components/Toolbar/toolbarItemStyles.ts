import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { ToolbarItemProps, ToolbarItemState } from '../../../../components/Toolbar/ToolbarItem'
import { ToolbarVariables } from './toolbarVariables'
import getIconFillOrOutlineStyles from '../../getIconFillOrOutlineStyles'

type ToolbarItemPropsAndState = ToolbarItemProps & ToolbarItemState

const toolbarItemStyles: ComponentSlotStylesInput<ToolbarItemPropsAndState, ToolbarVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const { isFromKeyboard } = p
    return {
      backgroundColor: v.background,
      borderWidth: v.borderWidth,
      borderStyle: 'solid',
      borderColor: 'transparent',
      borderRadius: v.borderRadius,
      height: v.itemHeight,
      minWidth: v.itemHeight,
      color: v.foreground,
      cursor: 'pointer',

      ':focus': {
        outline: 0,
      },

      ...(p.active && {
        color: v.foregroundActive,
        backgroundColor: v.backgroundActive,
        ...getIconFillOrOutlineStyles({ outline: false }),
      }),

      ':hover': {
        color: v.foregroundHover,
        backgroundColor: v.backgroundHover,
        ...getIconFillOrOutlineStyles({ outline: false }),
      },

      ...(isFromKeyboard && {
        color: v.foregroundHover,
        backgroundColor: v.backgroundHover,
        borderColor: v.borderHover,
        ...getIconFillOrOutlineStyles({ outline: false }),
      }),

      ...(p.disabled && {
        color: v.foregroundDisabled,
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
