import * as React from 'react'
import { createSnapshot } from 'jest-react-fela'
import { EmptyThemeProvider } from 'test/utils'
import Box from 'src/components/Box/Box'
import Provider from 'src/components/Provider/Provider'
import Text from 'src/components/Text/Text'
import { felaRenderer } from 'src/lib'

test('basic styles are rendered', () => {
  const snapshot = createSnapshot(
    <EmptyThemeProvider>
      <Box styles={{ color: 'red' }} />
    </EmptyThemeProvider>,
    {},
    felaRenderer,
  )
  expect(snapshot).toMatchSnapshot()
})

test('CSS fallback values are rendered', () => {
  const snapshot = createSnapshot(
    <EmptyThemeProvider>
      <Box styles={{ color: ['red', 'blue'] }} />
    </EmptyThemeProvider>,
    {},
    felaRenderer,
  )
  expect(snapshot).toMatchSnapshot()
})

test('keyframe colors are rendered', () => {
  const spinner = {
    keyframe: ({ fromColor, toColor }) => ({
      from: {
        color: fromColor,
      },
      to: {
        color: toColor,
      },
    }),
    keyframeParams: {
      fromColor: 'red',
      toColor: 'blue',
    },
    duration: '5s',
  }

  const snapshot = createSnapshot(
    <Provider theme={{ animations: { spinner } }}>
      <Box animation="spinner" />
    </Provider>,
    {},
    felaRenderer,
  )
  expect(snapshot).toMatchSnapshot()
})

test('array returned by keyframe results in CSS fallback values', () => {
  const steps = ['0%', '100%']

  const spinner = {
    keyframe: ({ steps }) => {
      const obj = {}
      steps.forEach((step: string, index) => {
        ;(obj as any)[step] = { color: ['blue', 'red', 'yellow'] }
      })
      return obj
    },
    keyframeParams: { steps },
  }

  const snapshot = createSnapshot(
    <Provider theme={{ animations: { spinner } }}>
      <Box animation="spinner" />
    </Provider>,
    {},
    felaRenderer,
  )
  expect(snapshot).toMatchSnapshot()
})

test('marginLeft is rendered into marginRight due to RTL', () => {
  const snapshot = createSnapshot(
    <Provider rtl={true}>
      <Text content="Hello" styles={{ marginLeft: '10px' }} />
    </Provider>,
    {},
    felaRenderer,
  )
  expect(snapshot).toMatchSnapshot()
})
