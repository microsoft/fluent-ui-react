import * as React from 'react'
import { Button, Provider } from '@stardust-ui/react'

const ButtonUsageExampleShorthand = () => (
  <div>
    <Provider
      theme={{
        componentVariables: {
          Button: siteVars => ({
            color: siteVars.colorScheme.brand.foreground,
            colorHover: siteVars.colorScheme.brand.foreground,
            colorFocus: siteVars.colorScheme.default.foreground,
            colorDisabled: siteVars.colorScheme.brandForegroundDisabled,
            backgroundColor: siteVars.colorScheme.default.background,
            backgroundColorActive: siteVars.colorScheme.brandBorderPressed,
            backgroundColorHover: siteVars.colorScheme.brand.backgroundHover1,
            backgroundColorFocus: siteVars.colorScheme.default.background,
            backgroundColorDisabled: siteVars.colorScheme.brand.backgroundDisabled,
            borderColor: siteVars.colorScheme.brandBorder2,
            borderColorHover: siteVars.colorScheme.brandBorderHover,
          }),
        },
      }}
    >
      <Button content="Tinted Button" /> <Button disabled content="Tinted Button Disabled" />
    </Provider>
    This button's styling is using color scheme variables.
  </div>
)

export default ButtonUsageExampleShorthand
