import * as React from 'react'
import { Animation, Icon, Provider } from '@stardust-ui/react'

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
  <Provider theme={{ animations: { spinner, colorChanger } }}>
    <div>
      <Animation name="spinner">
        <Icon name="umbrella" circular />
      </Animation>
      <Animation name="colorChanger">
        <Icon name="umbrella" circular />
      </Animation>
      <Animation name="colorChanger" keyframeParams={{ fromColor: 'violet', toColor: 'purple' }}>
        <Icon name="umbrella" circular />
      </Animation>
      <Icon name="umbrella" animation="colorChanger" />
      <Icon
        name="umbrella"
        animation={{
          name: 'colorChanger',
          keyframeParams: { fromColor: 'green', toColor: 'yellow' },
        }}
      />
    </div>
  </Provider>
)

export default AnimationExample
