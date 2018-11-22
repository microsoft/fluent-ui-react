import * as React from 'react'
import { Transition, Icon } from '@stardust-ui/react'

const TransitionExampleDelay = () => (
  <div>
    {'This animation will start after 5 seconds'}
    <br />
    <Transition animationName="spinner" delay="5s">
      <Icon name="umbrella" circular />
    </Transition>
  </div>
)

export default TransitionExampleDelay
