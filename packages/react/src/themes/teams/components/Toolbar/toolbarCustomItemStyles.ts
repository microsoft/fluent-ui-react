import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import { ToolbarCustomItemProps } from '../../../../components/Toolbar/ToolbarCustomItem'
import { ToolbarVariables } from './toolbarVariables'
import { getColorScheme } from '../../colors'
import getBorderFocusStyles from '../../getBorderFocusStyles'

const toolbarCustomItemStyles: ComponentSlotStylesPrepared<
  ToolbarCustomItemProps,
  ToolbarVariables
> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    const colors = getColorScheme(v.colorScheme)
    const { borderWidth } = siteVariables
    const borderFocusStyles = getBorderFocusStyles({
      siteVariables,
    })

    return {
      position: 'relative',
      backgroundColor: v.background,
      borderColor: 'transparent',
      borderWidth,
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

      ':focus': borderFocusStyles[':focus'],

      ':focus-visible': borderFocusStyles[':focus-visible'],
    }
  },
}

export default toolbarCustomItemStyles
