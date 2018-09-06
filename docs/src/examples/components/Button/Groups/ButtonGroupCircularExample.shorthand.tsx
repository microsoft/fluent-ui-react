import React from 'react'
import { Button } from '@stardust-ui/react'

const ButtonGroupCircularExampleShorthand = () => (
  <Button.Group
    circular
    buttons={[
      { icon: 'book', type: 'primary' },
      { icon: 'coffee' },
      { icon: 'play', type: 'primary' },
    ]}
  />
)

export default ButtonGroupCircularExampleShorthand
