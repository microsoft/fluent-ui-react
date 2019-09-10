import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { ToolbarCustomItemProps } from '../../../../components/Toolbar/ToolbarCustomItem'
import { ToolbarVariables } from './toolbarVariables'
import { getColorScheme } from '../../colors'

const toolbarCustomItemStyles: ComponentSlotStylesInput<
  ToolbarCustomItemProps,
  ToolbarVariables
> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const colors = getColorScheme(v.colorScheme)

    return {
      backgroundColor: v.background,
      borderColor: 'transparent',
      borderWidth: v.borderWidth,
      borderStyle: 'solid',
      height: v.itemHeight,
      color: v.foreground || colors.foreground1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...(p.fitted !== true &&
        p.fitted !== 'horizontally' && {
          paddingLeft: v.customItemHorizontalPadding,
          paddingRight: v.customItemHorizontalPadding,
        }),
      ...(p.fitted !== true &&
        p.fitted !== 'vertically' && {
          paddingTop: v.customItemVerticalPadding,
          paddingBottom: v.customItemVerticalPadding,
        }),

      ':focus': {
        outline: 0,
      },

      ':focus-visible': {
        color: v.foregroundFocus || colors.foregroundFocus,
        backgroundColor: v.backgroundFocus || colors.backgroundFocus,
        borderColor: v.borderFocus || colors.borderFocus,
      },
    }
  },
}

export default toolbarCustomItemStyles
