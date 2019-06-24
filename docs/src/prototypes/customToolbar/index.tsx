import * as React from 'react'
import {
  KnobProvider,
  useBooleanKnob,
  useSelectKnob,
  KnobInspector,
} from '@stardust-ui/docs-components'
import { Provider, Flex, themes, mergeThemes } from '@stardust-ui/react'

import { darkThemeOverrides } from './darkThemeOverrides'
import { highContrastThemeOverrides } from './highContrastThemeOverrides'

import CustomToolbar, { CustomToolbarProps } from './CustomToolbar'
import ComponentExampleKnobs from 'docs/src/components/ComponentDoc/ComponentExample/ComponentExampleKnobs'

const CustomToolbarPrototype: React.FunctionComponent = () => {
  const [themeName] = useSelectKnob({
    name: 'themeName',
    values: ['teamsDark', 'teamsHighContrast'],
    initialValue: 'teamsDark',
  })

  const availableLayouts: CustomToolbarProps['layout'][] = ['whiteboard', 'powerpoint-presenter']
  const [layout] = useSelectKnob({
    name: 'layout',
    values: availableLayouts,
    initialValue: undefined,
  })

  const [cameraActive, onCameraChange] = useBooleanKnob({
    name: 'cameraActive',
    initialValue: true,
  })
  const [micActive, onMicChange] = useBooleanKnob({ name: 'micActive', initialValue: true })
  const [screenShareActive, onScreenShareChange] = useBooleanKnob({
    name: 'screenShareActive',
    initialValue: true,
  })
  const [chatActive, onChatChange] = useBooleanKnob({ name: 'chatActive', initialValue: false })

  let theme = {}
  if (themeName === 'teamsDark') {
    theme = mergeThemes(themes.teamsDark, darkThemeOverrides)
  } else if (themeName === 'teamsHighContrast') {
    theme = mergeThemes(themes.teamsHighContrast, darkThemeOverrides, highContrastThemeOverrides)
  }

  return (
    <div style={{ height: '100vh' }}>
      <Flex column fill>
        <ComponentExampleKnobs>
          <KnobInspector />
        </ComponentExampleKnobs>

        <Provider theme={theme}>
          <Flex
            hAlign="center"
            styles={{
              padding: '200px 0 50px 0',
              backgroundColor: '#8EC5FC',
              backgroundImage: 'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)',
            }}
          >
            <CustomToolbar
              layout={layout}
              cameraActive={cameraActive}
              micActive={micActive}
              screenShareActive={screenShareActive}
              chatActive={chatActive}
              onCameraChange={onCameraChange}
              onMicChange={onMicChange}
              onScreenShareChange={onScreenShareChange}
              onChatChange={onChatChange}
            />
          </Flex>
        </Provider>
      </Flex>
    </div>
  )
}

export default () => (
  <KnobProvider>
    <CustomToolbarPrototype />
  </KnobProvider>
)
