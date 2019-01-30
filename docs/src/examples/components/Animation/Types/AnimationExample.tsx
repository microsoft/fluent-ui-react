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

const AnimationExample = () => (
  <Provider theme={{ animations: { spinner } }}>
    <Animation name="spinner">
      <Icon name="umbrella" circular />
    </Animation>
  </Provider>
)

export default AnimationExample
