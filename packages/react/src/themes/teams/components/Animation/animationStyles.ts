import * as _ from 'lodash'
import { ANIMATION_TYPE } from '../../../../components/Animation/Animation'
import { AnimationProp } from '../../../types'
import { normalizeAnimationDuration, createAnimationStyles } from '../../../../lib'

export default {
  root: () => ({
    display: 'inline-block',
  }),
  children: ({ props: p, theme }) => {
    const status = p.status
    const type = ANIMATION_TYPE[status]
    const animationDuration = type
      ? normalizeAnimationDuration(p.duration, type)
      : typeof p.duration === 'string' || _.isNil(p.duration)
      ? p.duration
      : p.duration['show']
    const animation: AnimationProp = {
      name: p.name,
      keyframeParams: p.keyframeParams,
      duration: animationDuration,
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
