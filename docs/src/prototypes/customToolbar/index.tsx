// http://localhost:8080/maximize/prototype-custom-toolbar

import * as _ from 'lodash'
import * as React from 'react'
import { KnobProvider, KnobInspector } from '@stardust-ui/docs-components'
import {
  Provider,
  Flex,
  themes,
  mergeThemes,
  Header,
  List,
  Button,
  Divider,
} from '@stardust-ui/react'

import { darkThemeOverrides } from './darkThemeOverrides'
import { highContrastThemeOverrides } from './highContrastThemeOverrides'

import CustomToolbar from './CustomToolbar'
import ComponentExampleKnobs from 'docs/src/components/ComponentDoc/ComponentExample/ComponentExampleKnobs'
import Ufd from './Ufd'
import useToolbarKnobs from './useToolbarKnobs'
import MouseTrigger from './MouseTrigger'
import { UfdRegion } from './UfdRegion'

const CustomToolbarPrototype: React.FunctionComponent = () => {
  const knobs = useToolbarKnobs()
  const { rtl, themeName, sidebarSelected, onSidebarChange, ...toolbarProps } = knobs
  const [currentSlide, setCurrentSlide] = React.useState(23)
  const totalSlides = 34

  const [showTopUfd, setShowTopUfd] = React.useState(false)
  const [showSecondTopUfd, setSecondShowTopUfd] = React.useState(false)

  const [showTopUfdSingleRegion, setShowTopUfdUniqueRegion] = React.useState(false)
  const [showSecondTopUfdSingleRegion, setSecondShowTopUfdUniqueRegion] = React.useState(false)

  const [showCenteredUfd, setShowCenteredUfd] = React.useState(false)
  const [showAttachedUfd, setShowAttachedUfd] = React.useState(false)

  let theme = {}
  if (themeName === 'teamsDark') {
    theme = mergeThemes(themes.teamsDark, darkThemeOverrides)
  } else if (themeName === 'teamsHighContrast') {
    theme = mergeThemes(themes.teamsHighContrast, darkThemeOverrides, highContrastThemeOverrides)
  }

  /*
  - top UFD -  - complementary
  +---------+  + main
  |         |  |
  |  stage  |  |
  +---------+  |
  -cdenterUFD  |- region
  - ubar UFD-  |* region
  ---ubar----  |- toolbar
  ---pbar----  +- region
  */

  return (
    <div style={{ height: '100vh' }}>
      <Provider theme={theme} rtl={rtl}>
        {(showTopUfd || showSecondTopUfd) && (
          <UfdRegion aria-label="top warning">
            {showTopUfd && (
              <Ufd
                content="Others may have trouble hearing you clearly. Try moving a bit away from your mic."
                position="top"
                label="Alert"
                buttons={[
                  <Button
                    aria-describedby="topUfd-1"
                    content="Dismiss"
                    onClick={() => setShowTopUfd(false)}
                    primary
                  />,
                ]}
                contentId="topUfd-1"
              />
            )}
            {showSecondTopUfd && (
              <Ufd
                content="Echo in your room! Turn off your audio or ask others to turn off theirs."
                position="top"
                label="Alert"
                buttons={[
                  <Button
                    aria-describedby="topUfd-2"
                    content="Turn off my audio"
                    onClick={() => setSecondShowTopUfd(false)}
                    primary
                  />,
                  <Button
                    aria-describedby="topUfd-2"
                    content="Dismiss"
                    onClick={() => setSecondShowTopUfd(false)}
                    primary
                  />,
                ]}
                contentId="topUfd-2"
              />
            )}
          </UfdRegion>
        )}
        {showTopUfdSingleRegion && (
          <div role="region" aria-label="warning">
            <Ufd
              content="Others may have trouble hearing you clearly. Try moving a bit away from your mic."
              position="top"
              label="Alert"
              buttons={[
                <Button
                  aria-describedby="topUfd-1"
                  content="Dismiss"
                  onClick={() => setShowTopUfdUniqueRegion(false)}
                  primary
                />,
              ]}
              contentId="topUfd-1"
            />
          </div>
        )}
        {showSecondTopUfdSingleRegion && (
          <div role="region" aria-label="warning">
            <Ufd
              content="Echo in your room! Turn off your audio or ask others to turn off theirs."
              position="top"
              label="Alert"
              buttons={[
                <Button
                  aria-describedby="topUfd-2"
                  content="Turn off my audio"
                  onClick={() => setSecondShowTopUfdUniqueRegion(false)}
                  primary
                />,
                <Button
                  aria-describedby="topUfd-2"
                  content="Dismiss"
                  onClick={() => setSecondShowTopUfdUniqueRegion(false)}
                  primary
                />,
              ]}
              contentId="topUfd-2"
            />
          </div>
        )}
        <Flex column fill>
          <div role="main" aria-labelledby="meeting-header">
            <Header
              as="h2"
              id="meeting-header"
              content="Random meeting title"
              styles={{ position: 'fixed', top: '20px', paddingLeft: '20px' }}
            />
            <Flex
              styles={{
                position: 'absolute',
                right: '40px',
                top: '40px',
              }}
            />
            <Flex // this is the stage part
              hAlign="center"
              styles={{
                padding: '250px 0 250px 0',
                backgroundColor: '#8EC5FC',
                backgroundImage: 'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)',
              }}
            >
              <List selectable items={['Dummy stage participant']} />
            </Flex>

            <div // this is the place for centered UFDs
              style={{
                position: 'fixed',
                left: '50%',
                transform: 'translateX(-25%)',
                bottom: '500px',
                width: '500px',
              }}
            >
              {showCenteredUfd && (
                <Ufd
                  content="Random Centered UFD"
                  position="center"
                  label="Alert"
                  buttons={[
                    <Button
                      icon="close"
                      aria-label="Dismiss"
                      aria-describedby="contentId"
                      iconOnly={true}
                      onClick={() => setShowTopUfd(false)}
                    />,
                  ]}
                  contentId="showCenteredUfd-1"
                />
              )}
            </div>

            {showAttachedUfd && (
              <Ufd
                attachedTo="toolbar-mic-button"
                content="Random attached alert"
                position="popup"
                label="Alert"
                buttons={[
                  <Button content="Dismiss" onClick={() => setShowTopUfd(false)} primary />,
                ]}
                contentId="showAttachedUfd-1"
              />
            )}

            <div // this is the toolbar part
              style={{
                position: 'fixed',
                left: '50%',
                transform: 'translateX(-25%)',
                bottom: '400px',
              }}
            >
              <CustomToolbar
                label="UBar"
                sidebarSelected={sidebarSelected === 'false' ? false : sidebarSelected}
                pptSlide={`${currentSlide} of ${totalSlides}`}
                onSidebarChange={state => onSidebarChange(state || 'false')}
                onPptPrevClick={() => setCurrentSlide(_.max([1, currentSlide - 1]))}
                onPptNextClick={() => setCurrentSlide(_.min([totalSlides, currentSlide + 1]))}
                {...toolbarProps}
                moreOptionsPopupContent={
                  <ComponentExampleKnobs>
                    <KnobInspector />
                  </ComponentExampleKnobs>
                }
              />
            </div>
            <Flex // this is the bottom bar
              hAlign="center"
              styles={{
                padding: '100px 0 50px 0',
                backgroundColor: 'rgb(2,0,36)',
                backgroundImage:
                  'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,0,0,1) 100%)',
              }}
            >
              <Flex column style={{ width: '300px' }}>
                <Divider />
                <Divider content="Alerts join under one region" />
                <MouseTrigger content="TOP UFD Join Region" setter={setSecondShowTopUfd} />
                <MouseTrigger content="TOP UFD second Join Region" setter={setShowTopUfd} />
                <Divider content="Each alert has own region" />
                <MouseTrigger content="TOP UFD Unique Region" setter={setShowTopUfdUniqueRegion} />
                <MouseTrigger
                  content="TOP UFD second Unique Region"
                  setter={setSecondShowTopUfdUniqueRegion}
                />
                <Divider content="Centered UFD" />
                <MouseTrigger content="Show centered UFD" setter={setShowCenteredUfd} />
                <MouseTrigger content="Show attached UFD" setter={setShowAttachedUfd} />
              </Flex>
              <List selectable items={['Dummy passive participant']} />
            </Flex>
          </div>
        </Flex>
      </Provider>
    </div>
  )
}

export default () => (
  <KnobProvider>
    <CustomToolbarPrototype />
  </KnobProvider>
)
