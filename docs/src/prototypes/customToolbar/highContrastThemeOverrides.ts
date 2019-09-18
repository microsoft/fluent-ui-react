import { ThemeInput } from '@stardust-ui/react'
import { CustomToolbarVariables } from './darkThemeOverrides'

export const highContrastThemeOverrides: ThemeInput = {
  componentVariables: {
    Toolbar: (): Partial<CustomToolbarVariables> => ({
      ctItemActiveBackgroundOverlay: undefined,
    }),
  },
}
