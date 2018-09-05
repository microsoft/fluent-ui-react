import React from 'react'
import { Avatar, StatusIndicator } from '@stardust-ui/react'

const Available = (
  <StatusIndicator
    icon={{ name: 'check', variables: { color: 'white', backgroundColor: 'green' } }}
    title="Available"
  />
)

const AvatarExampleNameShorthand = () => <Avatar name="John Doe" status={Available} />

export default AvatarExampleNameShorthand
