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

const AnimationExampleTimingFunction = () => (
  <Provider theme={{ animations: { spinner } }}>
    <Grid columns={6}>
      <Text content="Ease" />
      <Text content="Linear" />
      <Text content="Ease in" />
      <Text content="Ease out" />
      <Text content="Ease in out" />
      <Text content="Cubic bezier" />
      <Animation name="spinner" timingFunction="ease">
        <Icon name="mention" circular bordered />
      </Animation>
      <Animation name="spinner" timingFunction="linear">
        <Icon name="mention" circular bordered />
      </Animation>
      <Animation name="spinner" timingFunction="ease-in">
        <Icon name="mention" circular bordered />
      </Animation>
      <Animation name="spinner" timingFunction="ease-out">
        <Icon name="mention" circular bordered />
      </Animation>
      <Animation name="spinner" timingFunction="ease-in-out">
        <Icon name="mention" circular bordered />
      </Animation>
      <Animation name="spinner" timingFunction="cubic-bezier(0.1, 0.5, 0.1, 0.5)">
        <Icon name="mention" circular bordered />
      </Animation>
    </Grid>
  </Provider>
)

export default AnimationExampleTimingFunction
