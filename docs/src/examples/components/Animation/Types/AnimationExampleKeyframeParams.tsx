import * as React from 'react'
import { Animation, Icon, Provider, ThemeAnimation } from '@stardust-ui/react'

const colorChanger: ThemeAnimation<{ fromColor: string; toColor: string }> = {
  keyframe: ({ fromColor, toColor }) => ({
    from: {
      color: fromColor,
    },
    to: {
      color: toColor,
    },
  }),
  keyframeParams: { fromColor: 'red', toColor: 'blue' },
  duration: '5s',
  iterationCount: 'infinite',
}

const AnimationExample = () => (
  <Provider theme={{ animations: { colorChanger } }}>
    <div>
      <Animation name="colorChanger">
        <Icon name="umbrella" circular bordered />
      </Animation>
      <Animation name="colorChanger" keyframeParams={{ fromColor: 'green', toColor: 'yellow' }}>
        <Icon name="umbrella" circular bordered />
      </Animation>
      <Animation name="colorChanger" keyframeParams={{ toColor: 'black' }}>
        <Icon name="umbrella" circular bordered />
      </Animation>
    </div>
  </Provider>
)

export default AnimationExample
