import * as React from 'react'
import { Button, Provider } from '@stardust-ui/react'

const ButtonUsageExampleShorthand = () => (
  <div>
    <Provider
      theme={{
        componentVariables: {
          Button: siteVariables => ({
            color: siteVariables.colors.brand[600],
            colorActive: siteVariables.colors.brand[300],
            colorHover: siteVariables.colors.brand[300],
            colorFocus: siteVariables.colors.brand[900],
            backgroundColor: '#252424', // no mapping color - tried - siteVariables.colors.grey[750]
            backgroundColorActive: siteVariables.colors.brand[200],
            backgroundColorHover: siteVariables.colors.brand[50],
            backgroundColorFocus: siteVariables.colors.brand[200],
            borderColor: siteVariables.colors.brand[200],
            borderColorActive: siteVariables.colors.brand[300],
            borderColorHover: siteVariables.colors.brand[300],
            borderColorFocus: siteVariables.colors.grey[900],
            borderColorFocusIndicator: siteVariables.colors.brand[900],
          }),
        },
      }}
    >
      <Button content="Tinted Button" />
    </Provider>
    This button's styling is only applicable to dark theme.
    <br />
    <br />
    <Provider
      theme={{
        componentVariables: {
          Button: siteVariables => ({
            color: siteVariables.colors.brand[600],
            colorActive: siteVariables.colors.brand[600],
            colorHover: siteVariables.colors.brand[600],
            colorFocus: siteVariables.colors.brand[900],
            backgroundColor: siteVariables.colors.white,
            backgroundColorActive: siteVariables.colors.brand[200],
            backgroundColorHover: siteVariables.colors.brand[50],
            backgroundColorFocus: siteVariables.colors.brand[200],
            borderColor: siteVariables.colors.brand[200],
            borderColorActive: siteVariables.colors.brand[300],
            borderColorHover: siteVariables.colors.brand[300],
            borderColorFocus: siteVariables.colors.white,
            borderColorFocusIndicator: siteVariables.colors.brand[900],
          }),
        },
      }}
    >
      <Button content="Tinted Button" />
    </Provider>
    This button's styling is only applicable to light theme.
  </div>
)

export default ButtonUsageExampleShorthand
