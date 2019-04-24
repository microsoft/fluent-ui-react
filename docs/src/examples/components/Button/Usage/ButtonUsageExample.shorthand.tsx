import * as React from 'react'
import { Button, Provider } from '@stardust-ui/react'

const ButtonUsageExampleShorthand = () => (
  <div>
    <Provider
      theme={{
        componentVariables: {
          Button: siteVariables => ({
            color: siteVariables.colors.primary[500],
            colorHover: siteVariables.brand04,
            colorFocus: siteVariables.colors.primary[900],
            backgroundColor: siteVariables.colors.grey[900],
            backgroundColorHover: siteVariables.colors.primary[50],
            backgroundColorFocus: siteVariables.colors.primary[100],
            borderColor: siteVariables.colors.primary[100],
            borderColorHover: siteVariables.colors.primary[200],
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
            colorHover: siteVariables.colors.primary[500],
            colorFocus: siteVariables.colors.primary[900],
            backgroundColor: siteVariables.colors.white,
            backgroundColorHover: siteVariables.colors.primary[50],
            backgroundColorFocus: siteVariables.colors.primary[100],
            borderColor: siteVariables.colors.primary[100],
            borderColorHover: siteVariables.colors.primary[200],
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
