import * as React from 'react'
import { createSnapshot } from 'jest-react-fela'
import { EmptyThemeProvider } from 'test/utils'
import Box from 'src/components/Box/Box'
import Animation from 'src/components/Animation/Animation'
import Provider from 'src/components/Provider/Provider'
import Text from 'src/components/Text/Text'
import { felaRenderer } from 'src/lib'
import { teams } from 'src/themes'

test('basic styles', () => {
  const snapshot = createSnapshot(
    <EmptyThemeProvider>
      <Box styles={{ color: 'red' }} />
    </EmptyThemeProvider>,
    {},
    felaRenderer,
  )
  expect(snapshot).toMatchSnapshot()
})

test('css fallback value', () => {
  const snapshot = createSnapshot(
    <EmptyThemeProvider>
      <Box styles={{ color: ['red', 'blue'] }} />
    </EmptyThemeProvider>,
    {},
    felaRenderer,
  )
  expect(snapshot).toMatchSnapshot()
})

test('keyframe', () => {
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
    <Provider theme={teams}>
      <Provider theme={{ animations: { spinner } }}>
        <Animation name="spinner">
          <Box />
        </Animation>
      </Provider>
    </Provider>,
    {},
    felaRenderer,
  )
  expect(snapshot).toMatchSnapshot()
})

test('keyframe is an array as an argument', () => {
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
          <Box />
        </Animation>
      </Provider>
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
        ;(obj as any)[step] = { opacity: [0.28, 0.51, 0.74] }
      })
      return obj
    },
  }

  const snapshot = createSnapshot(
    <Provider theme={teams}>
      <Provider theme={{ animations: { spinner } }}>
        <Animation name="spinner" keyframeParams={{ steps }}>
          <Box />
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
      <Text content="Hello" styles={{ marginLeft: '10px' }} />
    </Provider>,
    {},
    felaRenderer,
  )
  expect(snapshot).toMatchSnapshot()
})
