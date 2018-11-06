import { ThemePrepared, Animation } from '../themes/types'

const createAnimationStyles = (animation: Animation, theme: ThemePrepared) => {
  let animationCSSProp = {}
  const { animations = {} } = theme

  if (animation) {
    if (typeof animation === 'string') {
      if (animations[animation]) {
        const {
          keyframe,
          keyframeParams,
          duration,
          delay,
          direction,
          fillMode,
          iterationCount,
          playState,
          timingFunction,
        } = animations[animation]

        const evaluatedKeyframe = theme.renderer.renderKeyframe(keyframe, keyframeParams || {})
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
      }
    } else {
      const {
        name,
        keyframeParams: propKeyframeParams,
        duration: propDuration,
        delay: propDelay,
        direction: propDirection,
        fillMode: propFillMode,
        iterationCount: propIterationCount,
        playState: propPlayState,
        timingFunction: propTimingFunction,
      } = animation
      if (animations[name]) {
        const {
          keyframe,
          keyframeParams,
          duration,
          delay,
          direction,
          fillMode,
          iterationCount,
          playState,
          timingFunction,
        } = animations[name]

        const evaluatedKeyframe = theme.renderer.renderKeyframe(
          keyframe,
          propKeyframeParams || keyframeParams || {},
        )
        animationCSSProp = {
          animationName: evaluatedKeyframe,
          animationDelay: propDelay || delay,
          animationDirection: propDirection || direction,
          animationDuration: propDuration || duration,
          animationFillMode: propFillMode || fillMode,
          animationIterationCount: propIterationCount || iterationCount,
          animationPlayState: propPlayState || playState,
          animationTimingFunction: propTimingFunction || timingFunction,
        }
      }
    }
  }
  return animationCSSProp
}

export default createAnimationStyles
