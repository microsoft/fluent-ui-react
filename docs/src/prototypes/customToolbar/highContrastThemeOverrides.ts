import { ThemeInput } from '@stardust-ui/react'

export const highContrastThemeOverrides: ThemeInput = {
  componentVariables: {
    ToolbarItem: {
      ctColor: '#fff',
      ctBackground: '#000',
      ctPrimaryBackground: '#000',
      ctDangerBackground: '#000',

      ctColorHover: '#000',
      ctBackgroundHover: '#ffff01',
      ctPrimaryColorHover: '#000',
      ctPrimaryBackgroundHover: '#ffff01',
      ctDangerColorHover: '#000',
      ctDangerBackgroundHover: '#ffff01',
    },
  },
}
