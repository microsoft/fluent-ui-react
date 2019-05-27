import { createAnimationStyles, felaRenderer } from 'src/lib'
import { ProviderContextPrepared } from 'src/themes/types'

const theme = {
  siteVariables: { fontSizes: {} },
  componentVariables: {},
  componentStyles: {},
  icons: {},
  fontFaces: [],
  staticStyles: [],
  animations: {
    spinner: {
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
      fillMode: 'forwards',
      playState: 'running',
      timingFunction: 'ease',
      direction: 'reverse',
      delay: '2s',
    },
  },
}

const themeWithRenderedKeyframes = {
  ...theme,
  animations: {
    spinner: {
      keyframe: 'k1',
      duration: '5s',
      iterationCount: 'infinite',
      fillMode: 'forwards',
      playState: 'running',
      timingFunction: 'ease',
      direction: 'reverse',
      delay: '2s',
    },
  },
}

const context: ProviderContextPrepared = {
  theme,
  rtl: false,
  renderer: felaRenderer,
  disableAnimations: false,
}

const contextWithRenderedKeyframes: ProviderContextPrepared = {
  theme: themeWithRenderedKeyframes,
  rtl: false,
  renderer: felaRenderer,
  disableAnimations: false,
}

describe('createAnimationStyles', () => {
  test('applies all animation props from the theme if the animation is string', () => {
    expect(createAnimationStyles('spinner', context)).toMatchObject({
      animationName: expect.anything(),
      animationDuration: '5s',
      animationIterationCount: 'infinite',
      animationFillMode: 'forwards',
      animationPlayState: 'running',
      animationTimingFunction: 'ease',
      animationDirection: 'reverse',
      animationDelay: '2s',
    })
  })

  test('overrides theme props if the animation prop is object', () => {
    expect(
      createAnimationStyles({ name: 'spinner', duration: '1s', delay: '3s' }, context),
    ).toMatchObject({
      animationName: expect.anything(),
      animationDuration: '1s',
      animationIterationCount: 'infinite',
      animationFillMode: 'forwards',
      animationPlayState: 'running',
      animationTimingFunction: 'ease',
      animationDirection: 'reverse',
      animationDelay: '3s',
    })
  })

  test('calls renderer renderKeyframe if the keyframe is an object', () => {
    context.renderer.renderKeyframe = jest.fn()
    createAnimationStyles({ name: 'spinner', duration: '1s', delay: '3s' }, context)
    expect(context.renderer.renderKeyframe).toHaveBeenCalledTimes(1)
  })

  test('does not call renderer renderKeyframe if the keyframe is a string', () => {
    contextWithRenderedKeyframes.renderer.renderKeyframe = jest.fn()
    createAnimationStyles(
      { name: 'spinner', duration: '1s', delay: '3s' },
      contextWithRenderedKeyframes,
    )
    expect(contextWithRenderedKeyframes.renderer.renderKeyframe).not.toHaveBeenCalled()
  })
})
