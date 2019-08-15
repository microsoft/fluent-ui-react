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

const AnimationExampleDirection = () => (
  <Provider theme={{ animations: { spinner } }}>
    <Grid columns={4}>
      <Text content="Normal" />
      <Text content="Reverse" />
      <Text content="Alternate" />
      <Text content="Alternate reverse" />
      <Animation name="spinner">
        <Icon name="mention" circular bordered />
      </Animation>
      <Animation name="spinner" direction="reverse">
        <Icon name="mention" circular bordered />
      </Animation>
      <Animation name="spinner" direction="alternate">
        <Icon name="mention" circular bordered />
      </Animation>
      <Animation name="spinner" direction="alternate-reverse">
        <Icon name="mention" circular bordered />
      </Animation>
    </Grid>
  </Provider>
)

export default AnimationExampleDirection
