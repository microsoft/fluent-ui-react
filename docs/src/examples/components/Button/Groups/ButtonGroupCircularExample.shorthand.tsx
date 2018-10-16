import React from 'react'
import { Button } from '@stardust-ui/react'

const ButtonGroupCircularExampleShorthand = () => (
  <Button.Group
    circular
    buttons={[
      { key: 'book', icon: 'book', type: 'primary' },
      { key: 'coffee', icon: 'coffee' },
      { key: 'play', icon: 'play', type: 'primary' },
    ]}
  />
)

export default ButtonGroupCircularExampleShorthand
