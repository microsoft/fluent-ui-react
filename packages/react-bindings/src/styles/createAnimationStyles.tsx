import { ThemePrepared } from '@fluentui/styles'
import { AnimationProp } from '../themes/types'

const createAnimationStyles = (animation: AnimationProp, theme: ThemePrepared) => {
  let animationCSSProp = {}
  const { animations = {} } = theme

  if (animation) {
    const animationName = typeof animation === 'string' ? animation : animation.name
    if (animations[animationName]) {
      const {
        keyframe,
        duration,
        delay,
        direction,
        fillMode,
        iterationCount,
        playState,
        timingFunction,
        keyframeParams,
      } = animations[animationName]

      const animationThemeKeyframeParams = keyframeParams || {}
      const animationPropKeyframeParams = (animation as any).keyframeParams

      const mergedKeyframeParams =
        typeof animation === 'string' || !animationPropKeyframeParams
          ? animationThemeKeyframeParams
          : { ...animationThemeKeyframeParams, ...(animationPropKeyframeParams || {}) }

      const keyframeDefinition =
        typeof keyframe === 'string' ? keyframe : { keyframe, params: mergedKeyframeParams }

      if (typeof animation === 'string') {
        animationCSSProp = {
          animationName: keyframeDefinition,
          animationDelay: delay,
          animationDirection: direction,
          animationDuration: duration,
          animationFillMode: fillMode,
          animationIterationCount: iterationCount,
          animationPlayState: playState,
          animationTimingFunction: timingFunction,
        }
      } else {
        animationCSSProp = {
          animationName: keyframeDefinition,
          animationDelay: animation.delay || delay,
          animationDirection: animation.direction || direction,
          animationDuration: animation.duration || duration,
          animationFillMode: animation.fillMode || fillMode,
          animationIterationCount: animation.iterationCount || iterationCount,
          animationPlayState: animation.playState || playState,
          animationTimingFunction: animation.timingFunction || timingFunction,
        }
      }
    } else {
      // animations was not found in the theme object
      animationCSSProp =
        typeof animation === 'string'
          ? {
              animationName: animation,
            }
          : {
              animationName: animation.name,
              ...(animation.delay && { animationDelay: animation.delay }),
              ...(animation.direction && { animationDirection: animation.direction }),
              ...(animation.duration && { animationDuration: animation.duration }),
              ...(animation.fillMode && { animationFillMode: animation.fillMode }),
              ...(animation.iterationCount && {
                animationIterationCount: animation.iterationCount,
              }),
              ...(animation.playState && { animationPlayState: animation.playState }),
              ...(animation.timingFunction && {
                animationTimingFunction: animation.timingFunction,
              }),
            }
    }
  }
  return animationCSSProp
}

export default createAnimationStyles
