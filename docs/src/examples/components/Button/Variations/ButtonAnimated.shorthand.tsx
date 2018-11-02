import React from 'react'
import { Button } from '@stardust-ui/react'

const ButtonExampleAnimated = () => (
  <Button
    circular
    content="C"
    animation={{
      name: 'spinner',
      duration: '2s',
      iterationCount: 'infinite',
    }}
  />
)
export default ButtonExampleAnimated
