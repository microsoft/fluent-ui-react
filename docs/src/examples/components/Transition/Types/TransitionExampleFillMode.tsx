import * as React from 'react'
import { Transition, Icon, Grid, Text } from '@stardust-ui/react'

const TransitionExampleFillMode = () => (
  <Grid columns={4}>
    <Text content="None" />
    <Text content="Forwards" />
    <Text content="Backwards" />
    <Text content="Both" />
    <Transition animationName="colorChanger" fillMode="none" delay="3s" iterationCount="1">
      <Icon name="umbrella" circular />
    </Transition>
    <Transition animationName="colorChanger" fillMode="forwards" delay="3s" iterationCount="1">
      <Icon name="umbrella" circular />
    </Transition>
    <Transition animationName="colorChanger" fillMode="backwards" delay="3s" iterationCount="1">
      <Icon name="umbrella" circular />
    </Transition>
    <Transition animationName="colorChanger" fillMode="both" delay="3s" iterationCount="1">
      <Icon name="umbrella" circular />
    </Transition>
  </Grid>
)

export default TransitionExampleFillMode
