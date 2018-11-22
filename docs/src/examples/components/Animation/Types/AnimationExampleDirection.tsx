import * as React from 'react'
import { Animation, Icon, Grid, Text } from '@stardust-ui/react'

const AnimationExampleDirection = () => (
  <Grid columns={4}>
    <Text content="Normal" />
    <Text content="Reverse" />
    <Text content="Alternate" />
    <Text content="Alternate reverse" />
    <Animation name="spinner">
      <Icon name="umbrella" circular />
    </Animation>
    <Animation name="spinner" direction="reverse">
      <Icon name="umbrella" circular />
    </Animation>
    <Animation name="spinner" direction="alternate">
      <Icon name="umbrella" circular />
    </Animation>
    <Animation name="spinner" direction="alternate-reverse">
      <Icon name="umbrella" circular />
    </Animation>
  </Grid>
)

export default AnimationExampleDirection
