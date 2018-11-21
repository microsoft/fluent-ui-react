import * as React from 'react'
import { Transition, Icon, Grid, Text } from '@stardust-ui/react'

const TransitionExampleIterationCount = () => (
  <Grid columns={4}>
    <Text content="1 iteration" />
    <Text content="2 iterations" />
    <Text content="5 iterations" />
    <Text content="Infinite" />
    <Transition animationName="spinner" iterationCount="1">
      <Icon name="umbrella" circular />
    </Transition>
    <Transition animationName="spinner" iterationCount="2">
      <Icon name="umbrella" circular />
    </Transition>
    <Transition animationName="spinner" iterationCount="5">
      <Icon name="umbrella" circular />
    </Transition>
    <Transition animationName="spinner" iterationCount="infinite">
      <Icon name="umbrella" circular />
    </Transition>
  </Grid>
)

export default TransitionExampleIterationCount
