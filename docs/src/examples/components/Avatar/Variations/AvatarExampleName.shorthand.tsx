import React from 'react'
import { Avatar } from '@stardust-ui/react'

const availableStatus = {
  icon: { name: 'check', variables: { color: 'white', backgroundColor: 'green' } },
  title: 'Available',
}

const AvatarExampleNameShorthand = () => <Avatar name="John Doe" status={availableStatus} />

export default AvatarExampleNameShorthand
