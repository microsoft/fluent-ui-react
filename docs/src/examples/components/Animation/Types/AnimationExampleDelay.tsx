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

const AnimationExampleDelay = () => (
  <div>
    This animation will start after 5 seconds
    <br />
    <Provider theme={{ animations: { spinner } }}>
      <Animation name="spinner" delay="5s">
        <Icon name="umbrella" circular />
      </Animation>
    </Provider>
  </div>
)

export default AnimationExampleDelay
