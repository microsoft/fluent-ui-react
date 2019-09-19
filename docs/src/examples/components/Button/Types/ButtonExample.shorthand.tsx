import * as React from 'react'
import { Button, Provider, themes, mergeThemes, withDebugId } from '@stardust-ui/react'

const customTheme = {
  componentVariables: withDebugId(
    {
      Button: {
        backgroundColor: 'green',
      },
    },
    'customTheme',
  ),
  componentStyles: withDebugId(
    {
      Button: {
        root: {
          outline: '5px solid red',
        },
      },
    },
    'customTheme',
  ),
}

const ButtonExample = () => (
  <Provider theme={mergeThemes(customTheme, themes.teamsHighContrast)}>
    <Button
      variables={siteVariables => ({ color: siteVariables.colors.red[500] })}
      styles={{ color: 'blue' }}
      design={{ margin: '1px' }}
      content="Click here"
    />
  </Provider>
)

export default ButtonExample
