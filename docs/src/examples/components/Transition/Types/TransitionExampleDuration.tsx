import * as React from 'react'
import { Transition, Icon } from '@stardust-ui/react'

const TransitionExampleDuration = () => (
  <div>
    <Transition animationName="spinner" duration="1s">
      <Icon name="umbrella" circular />
    </Transition>
  </div>
)

export default TransitionExampleDuration
