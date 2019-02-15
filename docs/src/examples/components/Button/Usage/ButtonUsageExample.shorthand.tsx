import * as React from 'react'
import { Button, Provider } from '@stardust-ui/react'

const ButtonUsageExampleShorthand = () => (
  <div>
    <Provider
      theme={{
        componentVariables: {
          Button: siteVariables => ({
            color: siteVariables.colors.primary[500],
            colorActive: siteVariables.brand04,
            colorHover: siteVariables.brand04,
            colorFocus: siteVariables.colors.primary[900],
            backgroundColor: siteVariables.colors.grey[900],
            backgroundColorActive: siteVariables.colors.primary[100],
            backgroundColorHover: siteVariables.colors.primary[50],
            backgroundColorFocus: siteVariables.colors.primary[100],
            borderColor: siteVariables.colors.primary[100],
            borderColorActive: siteVariables.colors.primary[200],
            borderColorHover: siteVariables.colors.primary[200],
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
            color: siteVariables.colors.primary[500],
            colorActive: siteVariables.colors.primary[500],
            colorHover: siteVariables.colors.primary[500],
            colorFocus: siteVariables.colors.primary[900],
            backgroundColor: siteVariables.colors.white,
            backgroundColorActive: siteVariables.colors.primary[100],
            backgroundColorHover: siteVariables.colors.primary[50],
            backgroundColorFocus: siteVariables.colors.primary[100],
            borderColor: siteVariables.colors.primary[100],
            borderColorActive: siteVariables.colors.primary[200],
            borderColorHover: siteVariables.colors.primary[200],
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
