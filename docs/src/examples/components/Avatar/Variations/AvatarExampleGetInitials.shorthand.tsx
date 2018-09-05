import React from 'react'
import { Avatar } from '@stardust-ui/react'

const Available = {
  icon: { name: 'check', variables: { color: 'white', backgroundColor: 'green' } },
  title: 'Available',
}

const getInitials = name => name.split(' ').map(word => `${word[0]}.`)

const AvatarExampleGetInitialsShorthand = () => (
  <Avatar name="John Doe" getInitials={getInitials} status={Available} />
)

export default AvatarExampleGetInitialsShorthand
