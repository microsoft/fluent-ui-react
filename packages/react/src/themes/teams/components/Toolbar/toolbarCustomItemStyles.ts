import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { ToolbarCustomItemProps } from '../../../../components/Toolbar/ToolbarCustomItem'
import { ToolbarVariables } from './toolbarVariables'
import { getColorScheme } from '../../colors'

const toolbarCustomItemStyles: ComponentSlotStylesInput<
  ToolbarCustomItemProps,
  ToolbarVariables
> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const { fitted } = p
    const colors = getColorScheme(v.colorScheme)

    return {
      backgroundColor: v.background,
      height: v.itemHeight,
      color: v.foreground || colors.foreground1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...(fitted !== true &&
        fitted !== 'horizontally' && {
          paddingLeft: v.customItemHorizontalPadding,
          paddingRight: v.customItemHorizontalPadding,
        }),
      ...(fitted !== true &&
        fitted !== 'vertically' && {
          paddingTop: v.customItemVerticalPadding,
          paddingBottom: v.customItemVerticalPadding,
        }),
    }
  },
}

export default toolbarCustomItemStyles
