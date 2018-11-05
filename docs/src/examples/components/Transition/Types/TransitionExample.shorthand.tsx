import * as React from 'react'
import { Transition, Icon, Button } from '@stardust-ui/react'

const TransitionExampleShorthand = () => (
  <div>
    <Transition animationName="colorChanger" content="Hello from Transition!" />
    <Transition animationName="spinner">
      <Icon name="umbrella" circular />
    </Transition>
    <Transition animationName="spinner">
      <Button content={'I am spinning'} primary />
    </Transition>
  </div>
)

export default TransitionExampleShorthand
