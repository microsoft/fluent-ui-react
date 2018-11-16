import * as React from 'react'
import { Transition, Icon } from '@stardust-ui/react'

const TransitionExample = () => (
  <div>
    <Transition animationName="spinner">
      <Icon name="umbrella" circular />
    </Transition>
  </div>
)

export default TransitionExample
