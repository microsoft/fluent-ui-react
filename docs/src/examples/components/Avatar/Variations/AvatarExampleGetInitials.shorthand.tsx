import React from 'react'
import { Avatar } from '@stardust-ui/react'

const getInitials = name => name.split(' ').map(word => `${word[0]}.`)

const AvatarExampleGetInitialsShorthand = () => (
  <Avatar status="Available" name="John Doe" getInitials={getInitials} />
)

export default AvatarExampleGetInitialsShorthand
