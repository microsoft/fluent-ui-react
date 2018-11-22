import * as React from 'react'
import { Animation, Icon, Grid, Text } from '@stardust-ui/react'

const AnimationExampleIterationCount = () => (
  <Grid columns={4}>
    <Text content="1 iteration" />
    <Text content="2 iterations" />
    <Text content="5 iterations" />
    <Text content="Infinite" />
    <Animation name="spinner" iterationCount="1">
      <Icon name="umbrella" circular />
    </Animation>
    <Animation name="spinner" iterationCount="2">
      <Icon name="umbrella" circular />
    </Animation>
    <Animation name="spinner" iterationCount="5">
      <Icon name="umbrella" circular />
    </Animation>
    <Animation name="spinner" iterationCount="infinite">
      <Icon name="umbrella" circular />
    </Animation>
  </Grid>
)

export default AnimationExampleIterationCount
