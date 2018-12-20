import * as React from 'react'
import { Button, Provider } from '@stardust-ui/react'

const ButtonUsageExampleShorthand = () => (
  <div>
    <Provider
      theme={{
        componentVariables: {
          Button: siteVariables => ({
            color: siteVariables.brand06,
            colorActive: siteVariables.brand04,
            colorHover: siteVariables.brand04,
            colorFocus: siteVariables.brand02,
            backgroundColor: siteVariables.black,
            backgroundColorActive: siteVariables.brand14,
            backgroundColorHover: siteVariables.brand16,
            backgroundColorFocus: siteVariables.brand14,
            borderColor: siteVariables.brand14,
            borderColorActive: siteVariables.brand12,
            borderColorHover: siteVariables.brand12,
            borderColorFocus: siteVariables.black,
            borderColorFocusIndicator: siteVariables.brand02,
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
            color: siteVariables.brand06,
            colorActive: siteVariables.brand06,
            colorHover: siteVariables.brand06,
            colorFocus: siteVariables.brand02,
            backgroundColor: siteVariables.white,
            backgroundColorActive: siteVariables.brand14,
            backgroundColorHover: siteVariables.brand16,
            backgroundColorFocus: siteVariables.brand14,
            borderColor: siteVariables.brand14,
            borderColorActive: siteVariables.brand12,
            borderColorHover: siteVariables.brand12,
            borderColorFocus: siteVariables.white,
            borderColorFocusIndicator: siteVariables.brand02,
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
