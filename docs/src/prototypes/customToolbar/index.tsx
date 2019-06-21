import * as React from 'react'
import { Provider, Flex, themes, mergeThemes, Grid } from '@stardust-ui/react'

import { darkThemeOverrides } from './darkThemeOverrides'
import { highContrastThemeOverrides } from './highContrastThemeOverrides'

import CustomToolbar from './CustomToolbar'
import {
  KnobProvider,
  useBooleanKnob,
  useSelectKnob,
  KnobInspector,
} from '@stardust-ui/docs-components'
import ComponentExampleKnobs from 'docs/src/components/ComponentDoc/ComponentExample/ComponentExampleKnobs'

const CustomToolbarPrototype: React.FunctionComponent = () => {
  const [themeName] = useSelectKnob({
    name: 'themeName',
    values: ['teamsDark', 'teamsHighContrast'],
    initialValue: 'teamsDark',
  })
  const [layout] = useSelectKnob({
    name: 'layout',
    values: ['desktop-share', 'whiteboard', 'powerpoint-presenter'],
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
          <Flex hAlign="center" styles={{ padding: '200px 0 50px 0' }}>
            <CustomToolbar
              layout={layout}
              cameraActive={cameraActive}
              micActive={micActive}
              screenShareActive={screenShareActive}
              onCameraChange={onCameraChange}
              onMicChange={onMicChange}
              onScreenShareChange={onScreenShareChange}
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
