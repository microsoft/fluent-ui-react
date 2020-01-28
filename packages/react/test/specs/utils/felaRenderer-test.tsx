import * as React from 'react'
import { createSnapshot } from 'jest-react-fela'
import { EmptyThemeProvider } from 'test/utils'
import Box from 'src/components/Box/Box'
import Animation from 'src/components/Animation/Animation'
import Provider from 'src/components/Provider/Provider'
import Text from 'src/components/Text/Text'
import { felaRenderer } from 'src/utils'
import {
  ComponentAnimationProp,
  unstable_createAnimationStyles as createAnimationStyles,
} from '@fluentui/react-bindings'

// Animation component depends on theme styles 💣
// Issue: https://github.com/microsoft/fluent-ui-react/issues/2247
// This adds required styles when needed.
const AnimationComponentStyles = {
  root: ({ props: p, theme }) => {
    const animation: ComponentAnimationProp = {
      name: p.name,
      keyframeParams: p.keyframeParams,
      duration: p.duration,
      delay: p.delay,
      iterationCount: p.iterationCount,
      direction: p.direction,
      fillMode: p.fillMode,
      playState: p.playState,
      timingFunction: p.timingFunction,
    }

    return createAnimationStyles(animation, theme)
  },
}

describe('felaRenderer', () => {
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
        <Box styles={{ color: ['red', 'blue'] as any }} />
      </EmptyThemeProvider>,
      {},
      felaRenderer,
    )
    expect(snapshot).toMatchSnapshot()
  })

  test('keyframe colors are rendered', () => {
    const colorChanger = {
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
      <Provider
        theme={{
          componentStyles: { Animation: AnimationComponentStyles },
          animations: { colorChanger },
        }}
      >
        <Animation name="colorChanger">
          <Box />
        </Animation>
      </Provider>,
      {},
      felaRenderer,
    )
    expect(snapshot).toMatchSnapshot()
  })

  test('array returned by keyframe results in CSS fallback values', () => {
    const steps = ['0%', '100%']

    const colorChanger = {
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
      <Provider
        theme={{
          componentStyles: { Animation: AnimationComponentStyles },
          animations: { colorChanger },
        }}
      >
        <Animation name="colorChanger">
          <Box />
        </Animation>
      </Provider>,
      {},
      felaRenderer,
    )
    expect(snapshot).toMatchSnapshot()
  })

  test('animations are not applied if animations are disabled', () => {
    const spinner = {
      keyframe: {
        from: {
          transform: 'rotate(0deg)',
        },
        to: {
          transform: 'rotate(360deg)',
        },
      },
      duration: '5s',
      iterationCount: 'infinite',
    }

    const snapshot = createSnapshot(
      <Provider
        disableAnimations
        theme={{
          componentStyles: { Animation: AnimationComponentStyles },
          animations: { spinner },
        }}
      >
        <Animation name="spinner">
          <Box />
        </Animation>
      </Provider>,
      {},
      felaRenderer,
    )
    expect(snapshot).toMatchSnapshot()
  })

  test('marginLeft is rendered into marginRight due to RTL', () => {
    const snapshot = createSnapshot(
      <Provider rtl>
        <Text content="Hello" styles={{ marginLeft: '10px' }} />
      </Provider>,
      {},
      felaRenderer,
    )
    expect(snapshot).toMatchSnapshot()
  })

  test('marginLeft is rendered into marginLeft due to RTL with `noFlip`', () => {
    const snapshot = createSnapshot(
      <Provider rtl>
        <Text content="Hello" styles={{ marginLeft: '10px /* @noflip */' }} />
      </Provider>,
      {},
      felaRenderer,
    )
    expect(snapshot).toMatchSnapshot()
  })

  test('styles are expanded to longhand values', () => {
    const snapshot = createSnapshot(
      <EmptyThemeProvider>
        <Box
          styles={{
            borderStyle: 'solid',
            // spaces in color value are important
            borderColor: 'rgba(51,204, 51, 1) rgba(51,0,204, 1)',
          }}
        />
      </EmptyThemeProvider>,
      {},
      felaRenderer,
    )
    expect(snapshot).toMatchSnapshot()
  })
})
