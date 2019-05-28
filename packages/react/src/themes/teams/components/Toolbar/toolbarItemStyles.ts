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

      ':focus': {
        outline: 0,
      },

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
    }
  },
}

export default toolbarItemStyles
