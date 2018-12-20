import * as React from 'react'
import { Avatar } from '@stardust-ui/react'

const getInitials = name => name.split(' ').map(word => `${word[0]}.`)

const AvatarExampleGetInitialsShorthand = () => (
  <Avatar
    name="John Doe"
    getInitials={getInitials}
    status={{ color: 'green', icon: 'check', title: 'Available' }}
  />
)

export default AvatarExampleGetInitialsShorthand
