import * as React from 'react'
import { createSnapshot } from 'jest-react-fela'
import { EmptyThemeProvider } from 'test/utils'
import Box from 'src/components/Box/Box'
import Animation from 'src/components/Animation/Animation'
import Icon from 'src/components/Icon/Icon'
import Provider from 'src/components/Provider/Provider'
import { felaRenderer } from 'src/lib'

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
  const steps = [
    '0%',
    '4%',
    '8.16%',
    '16.32%',
    '24.47%',
    '66.79%',
    '74.95%',
    '83.11%',
    '91.26%',
    '100%',
  ]

  const spinner = {
    keyframe: ({ steps }) => {
      const obj = {}
      steps.map((step: string, index) => {
        return ((obj as any)[step] = { opacity: 0.28 })
      })
      return obj
    },
    duration: '5s',
    iterationCount: 'infinite',
  }

  const snapshot = createSnapshot(
    <Provider theme={{ animations: { spinner } }}>
      <Animation name="spinner" keyframeParams={{ steps }}>
        <Icon name="umbrella" circular bordered />
      </Animation>
    </Provider>,
    {},
    felaRenderer,
  )
  expect(snapshot).toMatchSnapshot()
})
