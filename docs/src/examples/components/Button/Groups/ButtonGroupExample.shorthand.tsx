import * as React from 'react'
import { Button } from '@stardust-ui/react'

const ButtonGroupExampleShorthand = () => (
  <Button.Group
    buttons={[
      { key: 'emoji', icon: 'emoji', iconOnly: true },
      { key: 'translation', icon: 'translation', iconOnly: true },
      { key: 'play', icon: 'play', iconOnly: true },
    ]}
  />
)

export default ButtonGroupExampleShorthand
