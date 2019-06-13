import * as React from 'react'
import DocPage from '../components/DocPage/DocPage'
import GuidesNavigationFooter from '../components/GuidesNavigationFooter'
import ColorSchemes from 'docs/src/components/ColorSchemes'

import { Dropdown, themes, Flex, Provider } from '@stardust-ui/react'
import { faderStyles } from 'docs/src/components/Fader'
import { colorVariantsStyles } from 'docs/src/components/ColorVariants'
import { colorBoxStyles, colorBoxVariables } from 'docs/src/components/ColorBox'

export default () => {
  const [color, setColor] = React.useState('brand')
  return (
    <Provider
      theme={{
        componentStyles: {
          ColorBox: colorBoxStyles,
          ColorVariants: colorVariantsStyles,
          Fader: faderStyles,
          Header: {
            root: {
              fontWeight: 700,
            },
          },
        },
        componentVariables: {
          ColorBox: colorBoxVariables,
        },
      }}
    >
      <DocPage title="Color schemes">
        <Flex column>
          <Dropdown
            items={['default', 'brand', 'red']}
            defaultValue={'brand'}
            placeholder="Select the color"
            onSelectedChange={(e, { value }) => setColor(value)}
          />
          <ColorSchemes
            themes={[themes.teams, themes.teamsHighContrast, themes.teamsDark]}
            headers={[
              {
                as: 'h3',
                content: 'Design token',
              },
              {
                as: 'h3',
                content: 'Light theme',
              },
              {
                as: 'h3',
                content: 'HC theme',
              },
              {
                as: 'h3',
                content: 'Dark theme',
              },
            ]}
            name={color}
          />
        </Flex>
        <GuidesNavigationFooter previous={{ name: 'Colors', url: 'color-palette' }} />
      </DocPage>
    </Provider>
  )
}
