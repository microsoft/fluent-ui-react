import * as React from 'react'
import { Transition, Icon } from '@stardust-ui/react'

const TransitionExampleDuration = () => (
  <Transition animationName="spinner" duration="1s">
    <Icon name="umbrella" circular />
  </Transition>
)

export default TransitionExampleDuration
