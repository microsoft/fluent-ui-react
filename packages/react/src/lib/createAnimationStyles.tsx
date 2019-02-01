import { ThemePrepared, AnimationProp } from '../themes/types'
import callable from './callable'

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

      const evaluatedKeyframe =
        typeof keyframe === 'string'
          ? keyframe
          : theme.renderer.renderKeyframe(callable(keyframe), mergedKeyframeParams)

      if (typeof animation === 'string') {
        animationCSSProp = {
          animationName: evaluatedKeyframe,
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
          animationName: evaluatedKeyframe,
          animationDelay: animation.delay || delay,
          animationDirection: animation.direction || direction,
          animationDuration: animation.duration || duration,
          animationFillMode: animation.fillMode || fillMode,
          animationIterationCount: animation.iterationCount || iterationCount,
          animationPlayState: animation.playState || playState,
          animationTimingFunction: animation.timingFunction || timingFunction,
        }
      }
    }
  }
  return animationCSSProp
}

export default createAnimationStyles
