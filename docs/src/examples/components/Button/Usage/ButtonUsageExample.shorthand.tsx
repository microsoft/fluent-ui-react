import * as React from 'react'
import { Button, Provider } from '@stardust-ui/react'

const ButtonUsageExampleShorthand = () => (
  <div>
    <Provider
      theme={{
        componentVariables: {
          Button: siteVariables => ({
            color: siteVariables.colors.primary[600],
            colorActive: siteVariables.colors.primary[300],
            colorHover: siteVariables.colors.primary[300],
            colorFocus: siteVariables.colors.primary[900],
            backgroundColor: '#252424', // no mapping color - tried - siteVariables.colors.grey[750]
            backgroundColorActive: siteVariables.colors.primary[200],
            backgroundColorHover: siteVariables.colors.primary[50],
            backgroundColorFocus: siteVariables.colors.primary[200],
            borderColor: siteVariables.colors.primary[200],
            borderColorActive: siteVariables.colors.primary[300],
            borderColorHover: siteVariables.colors.primary[300],
            borderColorFocus: siteVariables.colors.grey[900],
            borderColorFocusIndicator: siteVariables.colors.primary[900],
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
            color: siteVariables.colors.primary[600],
            colorActive: siteVariables.colors.primary[600],
            colorHover: siteVariables.colors.primary[600],
            colorFocus: siteVariables.colors.primary[900],
            backgroundColor: siteVariables.colors.white,
            backgroundColorActive: siteVariables.colors.primary[200],
            backgroundColorHover: siteVariables.colors.primary[50],
            backgroundColorFocus: siteVariables.colors.primary[200],
            borderColor: siteVariables.colors.primary[200],
            borderColorActive: siteVariables.colors.primary[300],
            borderColorHover: siteVariables.colors.primary[300],
            borderColorFocus: siteVariables.colors.white,
            borderColorFocusIndicator: siteVariables.colors.primary[900],
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
