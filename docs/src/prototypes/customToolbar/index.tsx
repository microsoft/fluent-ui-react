import * as _ from 'lodash'
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
  const [rtl] = useBooleanKnob({
    name: 'RTL',
    initialValue: false,
  })
  const [themeName] = useSelectKnob({
    name: 'themeName',
    values: ['teamsDark', 'teamsHighContrast'],
    initialValue: 'teamsDark',
  })

  const availableLayouts: CustomToolbarProps['layout'][] = [
    'standard',
    'desktop-share',
    'powerpoint-presenter',
  ]
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
    initialValue: false,
  })
  const [sidebarSelected, onSidebarChange] = useSelectKnob({
    name: 'sidebarSelected',
    values: ['false', 'chat', 'participant-add'],
    initialValue: 'false',
  })
  const [chatHasDot] = useBooleanKnob({ name: 'chatHasDot', initialValue: false })
  const [currentSlide, setCurrentSlide] = React.useState(23)
  const totalSlides = 34

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

        <Provider theme={theme} rtl={rtl}>
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
              sidebarSelected={sidebarSelected === 'false' ? false : sidebarSelected}
              chatHasDot={chatHasDot}
              pptSlide={`${currentSlide} of ${totalSlides}`}
              onCameraChange={onCameraChange}
              onMicChange={onMicChange}
              onScreenShareChange={onScreenShareChange}
              onSidebarChange={state => onSidebarChange(state || 'false')}
              onPptPrevClick={() => setCurrentSlide(_.max([1, currentSlide - 1]))}
              onPptNextClick={() => setCurrentSlide(_.min([totalSlides, currentSlide + 1]))}
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
