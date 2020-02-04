import { ICSSInJSStyle } from '@fluentui/styles'
import { getColorScheme } from '../../colors'

const toolbarMenuStyles = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const colors = getColorScheme(v.colorScheme)

    return {
      display: 'flex',
      zIndex: 1000,
      flexDirection: 'column',
      listStyleType: 'none',
      margin: 0,
      padding: v.menuPadding,
      backgroundColor: v.menuBackground || colors.background,
      boxShadow: v.menuBoxShadow,
      borderStyle: 'solid',
      borderColor: v.menuBorder || colors.border,
      borderWidth: v.menuBorderWidth,
      borderRadius: v.menuBorderRadius,
      width: v.menuWidth,
    }
  },
}

export default toolbarMenuStyles
