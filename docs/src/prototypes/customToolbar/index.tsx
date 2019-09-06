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
import { AlertStacks } from './AlertsStack'

const CustomToolbarPrototype: React.FunctionComponent = () => {
  const knobs = useToolbarKnobs()
  const { rtl, themeName, sidebarSelected, onSidebarChange, ...toolbarProps } = knobs
  const [currentSlide, setCurrentSlide] = React.useState(23)
  const totalSlides = 34

  const [showTopUfd, setShowTopUfd] = React.useState(false)
  const [showSecondTopUfd, setSecondShowTopUfd] = React.useState(false)

  // const [showTopUfdSingleRegion, setShowTopUfdUniqueRegion] = React.useState(false)
  // const [showSecondTopUfdSingleRegion, setSecondShowTopUfdUniqueRegion] = React.useState(false)

  const [showCenteredUfd, setShowCenteredUfd] = React.useState(false)
  const [showAttachedUfd, setShowAttachedUfd] = React.useState(false)
  const [showAttachedUfdWithButtons, setShowAttachedUfdWithButtons] = React.useState(false)

  // const [alertsArray, setNewAlert] = React.useState("alertsArray", [])
  const [alertsArray, setNewAlert] = React.useState([])

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

  // const removeAlert = (alertDefinition: any) => {
  //   const test = getNewArray(alertDefinition);
  //   if (test){
  //     setNewAlert(test)
  //   }
  // }

  const removeAlert = (alertDefinition: any) => {
    setNewAlert(prevState => {
      const index = prevState.indexOf(alertDefinition)
      if (index > -1) {
        return _.pull(prevState, alertDefinition)
        // return prevState.splice(index, 1);
      }
      return prevState
    })
  }

  const addAlert = (alertDefinition: any) => {
    setTimeout(() => {
      setNewAlert(prevState => {
        if (prevState.filter(alert => alert.content === alertDefinition.content).length === 0) {
          return [...prevState, alertDefinition]
        }
        return prevState
      })
    }, 3000)
  }

  const firstAlertDefinition = {
    content: 'Others may have trouble hearing you clearly. Try moving a bit away from your mic.',
    position: 'top',
    label: 'Alert',
    contentId: 'alert-1',
    buttons: [
      <Button content="Turn off my audio" onClick={() => alert('any action here')} primary />,
      <Button
        aria-describedby="topUfd-1"
        icon="close"
        iconOnly
        text
        title="Dismiss from index"
        onClick={() => removeAlert(firstAlertDefinition)}
        primary
      />,
    ],
  }

  const secondAlertDefinition = {
    content: 'Your internet connection is lost',
    position: 'top',
    label: 'Alert',
    contentId: 'alert-2',
    buttons: [
      <Button content="reconnect" onClick={() => alert('any action here')} primary />,
      //   <Button
      //   aria-describedby="topUfd-1"
      //   icon="close"
      //   iconOnly
      //   text
      //   title="Dismiss from index"
      //   onClick={() => removeAlert(secondAlertDefinition)}
      //   primary
      // />
    ],
  }

  const thirdAlertDefinition = {
    content:
      "Your microphone isn't working. Switch to a different device or try reconnecting this one.",
    position: 'top',
    label: 'Alert',
    contentId: 'alert-2',
    buttons: [
      <Button content="Device settings" onClick={() => alert('any action here')} primary />,
      <Button content="Call me back" onClick={() => alert('any action here')} primary />,
      // <Button
      //   aria-describedby="topUfd-1"
      //   icon="close"
      //   iconOnly
      //   text
      //   title="Dismiss"
      //   onClick={() => setNewAlert(removeAlert(secondAlertDefinition))}
      //   primary
      // />
    ],
  }

  return (
    <div style={{ height: '100vh' }}>
      <Provider theme={theme} rtl={rtl}>
        <div role="main" aria-labelledby="meeting-header">
          <UfdRegion aria-label="Warnings">
            {alertsArray.length >= 1 ? <AlertStacks alerts={alertsArray} /> : null}
            {(showTopUfd || showSecondTopUfd) && showTopUfd && (
              <Ufd
                content="Others may have trouble hearing you clearly. Try moving a bit away from your mic."
                position="top"
                label="Alert"
                buttons={[
                  <Button
                    aria-describedby="topUfd-1"
                    icon="close"
                    iconOnly
                    text
                    title="Dismiss"
                    onClick={() => setShowTopUfd(false)}
                    primary
                  />,
                ]}
                contentId="topUfd-1"
              />
            )}
            {showSecondTopUfd && (
              <Ufd
                content="Speaker volume low. You may not be able to hear because your speaker volume is too low."
                position="top"
                label="Alert"
                buttons={[
                  <Button
                    aria-describedby="topUfd-1"
                    icon="close"
                    iconOnly
                    text
                    title="Dismiss"
                    onClick={() => setShowTopUfd(false)}
                    primary
                  />,
                ]}
                contentId="topUfd-2"
              />
            )}
          </UfdRegion>
          <Flex column fill>
            <Header as="h2" id="meeting-header" content="Random meeting title" />
            <Flex
              styles={{
                position: 'absolute',
                right: '40px',
                top: '150px',
              }}
            >
              <Flex gap="gap.small">
                <Divider />
                <Flex column style={{ width: '300px' }}>
                  <Divider content="Informational banner" color="black" />
                  <MouseTrigger content="TOP UFD Join Region" setter={setSecondShowTopUfd} />
                  <MouseTrigger content="TOP UFD second Join Region" setter={setShowTopUfd} />
                </Flex>

                <Flex column style={{ width: '300px' }}>
                  {/* <Divider content="Centered UFD" color="pink" />
                  <MouseTrigger content="Show centered UFD" setter={setShowCenteredUfd} />
                  <MouseTrigger content="Show attached UFD" setter={setShowAttachedUfd} />  */}

                  <Divider content="Persistent UFD into multi stack" color="black" />
                  <MouseTrigger
                    content="Add alert 1"
                    setter={() => addAlert(firstAlertDefinition)}
                  />
                  <MouseTrigger
                    content="Add alert 2"
                    setter={() => addAlert(secondAlertDefinition)}
                  />
                  <MouseTrigger
                    content="Add alert 3"
                    setter={() => addAlert(thirdAlertDefinition)}
                  />

                  {/* <MouseTrigger
                    content="Show UFD mic not working "
                    setter={setShowAttachedUfdWithButtons}
                  /> */}
                </Flex>
              </Flex>
            </Flex>
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
                  label="Warning"
                  onDismiss={() => setShowCenteredUfd(false)}
                  contentId="centeredUfd-1"
                />
              )}
            </div>

            {showAttachedUfd && (
              <Ufd
                attachedTo="toolbar-mic-button"
                content="Random attached alert"
                position="popup"
                label="Warning"
                onDismiss={() => setShowAttachedUfd(false)}
                contentId="attachedUfd-1"
              />
            )}

            {showAttachedUfdWithButtons && (
              <Ufd
                attachedTo="toolbar-mic-button"
                content="Your microphone isn't working"
                position="popup"
                buttons={[
                  <Button
                    aria-describedby="attachedUfdWithButton-1"
                    icon="close"
                    iconOnly
                    text
                    title="Dismiss"
                    onClick={() => setShowAttachedUfdWithButtons(false)}
                    primary
                  />,
                  <Button aria-describedby="attachedUfdWithButton-1">Device settings</Button>,
                  <Button aria-describedby="attachedUfdWithButton-1" primary>
                    Call me back
                  </Button>,
                ]}
                label="Warning"
                contentId="attachedUfdWithButton-1"
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
              <List selectable items={['Dummy passive participant']} />
            </Flex>
          </Flex>
        </div>
      </Provider>
    </div>
  )
}

export default () => (
  <KnobProvider>
    <CustomToolbarPrototype />
  </KnobProvider>
)
