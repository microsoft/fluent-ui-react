import * as React from 'react'
import { Transition, Icon, Grid, Text } from '@stardust-ui/react'

const TransitionExampleDirection = () => (
  <Grid columns={4}>
    <Text content="Normal" />
    <Text content="Reverse" />
    <Text content="Alternate" />
    <Text content="Alternate reverse" />
    <Transition animationName="spinner">
      <Icon name="umbrella" circular />
    </Transition>
    <Transition animationName="spinner" direction="reverse">
      <Icon name="umbrella" circular />
    </Transition>
    <Transition animationName="spinner" direction="alternate">
      <Icon name="umbrella" circular />
    </Transition>
    <Transition animationName="spinner" direction="alternateReverse">
      <Icon name="umbrella" circular />
    </Transition>
  </Grid>
)

export default TransitionExampleDirection
