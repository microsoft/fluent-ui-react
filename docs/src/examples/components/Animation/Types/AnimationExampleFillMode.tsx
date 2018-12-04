import * as React from 'react'
import { Animation, Icon, Grid, Text, Provider } from '@stardust-ui/react'

const colorChanger = {
  keyframe: {
    from: { color: 'red' },
    to: { color: 'blue' },
  },
  duration: '3s',
  iterationCount: 'infinite',
}

const AnimationExampleFillMode = () => (
  <Provider theme={{ animations: { colorChanger } }}>
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
  </Provider>
)

export default AnimationExampleFillMode
