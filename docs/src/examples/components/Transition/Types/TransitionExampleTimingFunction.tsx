import * as React from 'react'
import { Transition, Icon, Grid, Text } from '@stardust-ui/react'

const TransitionExampleTimingFunction = () => (
  <Grid columns={6}>
    <Text content="Ease" />
    <Text content="Linear" />
    <Text content="Ease in" />
    <Text content="Ease out" />
    <Text content="Ease in out" />
    <Text content="Cubic bezier" />
    <Transition animationName="spinner" timingFunction="ease">
      <Icon name="umbrella" circular />
    </Transition>
    <Transition animationName="spinner" timingFunction="linear">
      <Icon name="umbrella" circular />
    </Transition>
    <Transition animationName="spinner" timingFunction="ease-in">
      <Icon name="umbrella" circular />
    </Transition>
    <Transition animationName="spinner" timingFunction="ease-out">
      <Icon name="umbrella" circular />
    </Transition>
    <Transition animationName="spinner" timingFunction="ease-in-out">
      <Icon name="umbrella" circular />
    </Transition>
    <Transition animationName="spinner" timingFunction="cubic-bezier(0.1, 0.5, 0.1, 0.5)">
      <Icon name="umbrella" circular />
    </Transition>
  </Grid>
)

export default TransitionExampleTimingFunction
