import * as React from 'react'
import { Animation, Icon, Provider } from '@stardust-ui/react'

const colorChanger = {
  keyframe: ({ fromColor, toColor }) => {
    return {
      from: {
        color: fromColor,
      },
      to: {
        color: toColor,
      },
    }
  },
  keyframeParams: { fromColor: 'red', toColor: 'blue' },
  duration: '5s',
  iterationCount: 'infinite',
}

const AnimationExample = () => (
  <Provider theme={{ animations: { colorChanger } }}>
    <div>
      <Animation name="colorChanger">
        <Icon name="umbrella" circular />
      </Animation>
      <Animation name="colorChanger" keyframeParams={{ fromColor: 'green', toColor: 'yellow' }}>
        <Icon name="umbrella" circular />
      </Animation>
    </div>
  </Provider>
)

export default AnimationExample
