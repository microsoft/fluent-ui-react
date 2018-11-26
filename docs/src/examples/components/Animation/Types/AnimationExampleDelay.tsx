import * as React from 'react'
import { Animation, Icon } from '@stardust-ui/react'

const AnimationExampleDelay = () => (
  <div>
    This animation will start after 5 seconds
    <br />
    <Animation name="spinner" delay="5s">
      <Icon name="umbrella" circular />
    </Animation>
  </div>
)

export default AnimationExampleDelay
