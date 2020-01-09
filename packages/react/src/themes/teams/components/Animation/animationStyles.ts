import { AnimationProp } from '../../../types'
import createAnimationStyles from '@fluentui/react-bindings/src/styles/createAnimationStyles'

export default {
  root: () => ({
    display: 'inline-block',
  }),
  children: ({ props: p, theme }) => {
    const animation: AnimationProp = {
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
