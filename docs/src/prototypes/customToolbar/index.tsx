import * as React from 'react'
import { Dropdown, Provider, Flex, themes, mergeThemes } from '@stardust-ui/react'

import { darkThemeOverrides } from './darkThemeOverrides'
import { highContrastThemeOverrides } from './highContrastThemeOverrides'

import CustomToolbar from './CustomToolbar'

export default () => {
  const [themeName, selectTheme] = React.useState('teamsDark')

  let theme = {}
  if (themeName === 'teamsDark') {
    theme = mergeThemes(themes.teamsDark, darkThemeOverrides)
  } else if (themeName === 'teamsHighContrast') {
    theme = mergeThemes(themes.teamsHighContrast, darkThemeOverrides, highContrastThemeOverrides)
  }

  return (
    <Provider theme={theme} styles={{ height: '100vh' }}>
      <Flex column fill padding="padding.medium" gap="gap.medium">
        <Dropdown
          items={['teamsDark', 'teamsHighContrast']}
          value={themeName}
          onSelectedChange={(e, { value }) => {
            selectTheme(value as string)
          }}
        />

        <div>calling toolbar description</div>

        <Flex.Item push align="center">
          <CustomToolbar />
        </Flex.Item>
      </Flex>
    </Provider>
  )
}
