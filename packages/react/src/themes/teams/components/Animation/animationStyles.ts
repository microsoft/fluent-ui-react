import { AnimationProp } from '../../../types'
import { ProviderContextPrepared } from '../../../../types'
import createAnimationStyles from '../../../../lib/createAnimationStyles'

export default {
  root: () => ({
    display: 'inline-block',
  }),
  children: ({ props, variables, ...context }) => {
    const animation: AnimationProp = {
      name: props.name,
      keyframeParams: props.keyframeParams,
      duration: props.duration,
      delay: props.delay,
      iterationCount: props.iterationCount,
      direction: props.direction,
      fillMode: props.fillMode,
      playState: props.playState,
      timingFunction: props.timingFunction,
    }

    return createAnimationStyles(animation, context as ProviderContextPrepared)
  },
}
