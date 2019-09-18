import * as React from 'react'
import { Button } from '@stardust-ui/react'

const ButtonGroupCircularExampleShorthand = () => (
  <Button.Group
    circular
    buttons={[
      { key: 'emoji', icon: 'emoji', primary: true },
      { key: 'translation', icon: 'translation' },
      { key: 'play', icon: 'play', primary: true },
    ]}
  />
)

export default ButtonGroupCircularExampleShorthand
