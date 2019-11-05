import * as React from 'react'
import { Avatar } from '@stardust-ui/react'

const AvatarExampleNameShorthand = () => (
  <Avatar
    name="John Doe"
    status={{
      styles: { backgroundColor: 'green' },
      icon: 'stardust-checkmark',
      title: 'Available',
    }}
  />
)

export default AvatarExampleNameShorthand
