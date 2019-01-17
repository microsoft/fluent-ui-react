import * as React from 'react'
import { Button } from '@stardust-ui/react'

const ButtonGroupCircularExampleShorthand = () => (
  <Button.Group
    circular
    buttons={[
      { key: 'book', icon: 'book', primary: true },
      { key: 'coffee', icon: 'coffee' },
      { key: 'play', icon: 'play', primary: true },
    ]}
  />
)

export default ButtonGroupCircularExampleShorthand
