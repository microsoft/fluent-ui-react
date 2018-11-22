import * as React from 'react'
import { Animation, Icon, Grid, Text } from '@stardust-ui/react'

const AnimationExampleFillMode = () => (
  <Grid columns={4}>
    <Text content="None" />
    <Text content="Forwards" />
    <Text content="Backwards" />
    <Text content="Both" />
    <Animation name="colorChanger" fillMode="none" delay="3s" iterationCount="1">
      <Icon name="umbrella" circular />
    </Animation>
    <Animation name="colorChanger" fillMode="forwards" delay="3s" iterationCount="1">
      <Icon name="umbrella" circular />
    </Animation>
    <Animation name="colorChanger" fillMode="backwards" delay="3s" iterationCount="1">
      <Icon name="umbrella" circular />
    </Animation>
    <Animation name="colorChanger" fillMode="both" delay="3s" iterationCount="1">
      <Icon name="umbrella" circular />
    </Animation>
  </Grid>
)

export default AnimationExampleFillMode
