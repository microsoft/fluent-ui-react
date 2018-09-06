import React from 'react'
import { Button } from '@stardust-ui/react'

const ButtonGroupExampleShorthand = () => (
  <Button.Group
    buttons={[
      { icon: 'book', iconOnly: true },
      { icon: 'coffee', iconOnly: true },
      { icon: 'play', iconOnly: true },
    ]}
  />
)

export default ButtonGroupExampleShorthand
