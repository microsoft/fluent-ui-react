import * as React from 'react'
import { Transition, Icon } from '@stardust-ui/react'

const TransitionExample = () => (
  <Transition animationName="spinner">
    <Icon name="umbrella" circular />
  </Transition>
)

export default TransitionExample
