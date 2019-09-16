import * as React from 'react'
import { Button, Provider, themes, mergeThemes } from '@stardust-ui/react'

const customTheme = {
  componentVariables: {
    Button: {
      backgroundColor: 'green',
    },
  },
  componentStyles: {
    Button: {
      root: {
        outline: '5px solid red',
      },
    },
  },
}

const ButtonExample = () => (
  <Provider theme={mergeThemes(customTheme, themes.teamsDark)}>
    <Button
      variables={siteVariables => ({ color: siteVariables.colors.red[500] })}
      styles={{ color: 'blue' }}
      design={{ margin: '1px' }}
      content="Click here"
    />
  </Provider>
)

export default ButtonExample
