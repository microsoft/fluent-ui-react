import { ICSSInJSStyle } from '../../../types'
import { pxToRem } from '@stardust-ui/react'
import { getColorScheme } from '../../colors'

const toolbarMenuStyles = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const colors = getColorScheme(v.colorScheme)

    return {
      display: 'flex',
      zIndex: 1000,
      flexDirection: 'column',
      padding: `${pxToRem(8)} 0`,
      backgroundColor: v.menuBackground || colors.background,
      boxShadow: v.menuBoxShadow,
      borderStyle: 'solid',
      borderColor: v.menuBorder || colors.border,
      borderWidth: v.menuBorderWidth,
      borderRadius: v.menuBorderRadius,
      width: pxToRem(200), // FIXME
    }
  },
}

export default toolbarMenuStyles
