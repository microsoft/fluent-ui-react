import * as React from 'react'
import { Animation, Icon, Grid, Text, Provider } from '@stardust-ui/react'

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

const AnimationExampleIterationCount = () => (
  <Provider theme={{ animations: { spinner } }}>
    <Grid columns={4}>
      <Text content="1 iteration" />
      <Text content="2 iterations" />
      <Text content="5 iterations" />
      <Text content="Infinite" />
      <Animation name="spinner" iterationCount="1">
        <Icon name="umbrella" circular bordered />
      </Animation>
      <Animation name="spinner" iterationCount="2">
        <Icon name="umbrella" circular bordered />
      </Animation>
      <Animation name="spinner" iterationCount="5">
        <Icon name="umbrella" circular bordered />
      </Animation>
      <Animation name="spinner" iterationCount="infinite">
        <Icon name="umbrella" circular bordered />
      </Animation>
    </Grid>
  </Provider>
)

export default AnimationExampleIterationCount
