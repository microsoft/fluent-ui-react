import * as React from 'react'
import { createSnapshot } from 'jest-react-fela'
import { EmptyThemeProvider } from 'test/utils'
import Box from 'src/components/Box/Box'
import Animation from 'src/components/Animation/Animation'
import Icon from 'src/components/Icon/Icon'
import Provider from 'src/components/Provider/Provider'
import Text from 'src/components/Text/Text'
import { felaRenderer } from 'src/lib'
import { teams } from 'src/themes'

test('css fallback value', () => {
  const snapshot = createSnapshot(
    <EmptyThemeProvider>
      <Box styles={{ color: 'red' }} />
    </EmptyThemeProvider>,
    {},
    felaRenderer,
  )
  expect(snapshot).toMatchSnapshot()
})

test('keyframe returning css fallback value', () => {
  const steps = ['0%', '100%']

  const spinner = {
    keyframe: ({ steps }) => {
      const obj = {}
      steps.forEach((step: string, index) => {
        ;(obj as any)[step] = { opacity: 0.28 }
      })
      return obj
    },
  }

  const snapshot = createSnapshot(
    <Provider theme={teams}>
      <Provider theme={{ animations: { spinner } }}>
        <Animation name="spinner" keyframeParams={{ steps }}>
          <Icon name="umbrella" circular bordered />
        </Animation>
      </Provider>
    </Provider>,
    {},
    felaRenderer,
  )
  expect(snapshot).toMatchSnapshot()
})

test('rtl', () => {
  const snapshot = createSnapshot(
    <Provider rtl={true}>
      <Text content="Hello" />
    </Provider>,
    {},
    felaRenderer,
  )
  expect(snapshot).toMatchSnapshot()
})
