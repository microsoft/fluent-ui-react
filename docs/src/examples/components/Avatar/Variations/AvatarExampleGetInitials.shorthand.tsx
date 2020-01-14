import * as React from 'react'
import { Avatar } from '@fluentui/react'

const getInitials = name => name.split(' ').map(word => `${word[0]}.`)

const AvatarExampleGetInitialsShorthand = () => (
  <Avatar
    name="John Doe"
    getInitials={getInitials}
    status={{ color: 'green', icon: 'icon-checkmark', title: 'Available' }}
  />
)

export default AvatarExampleGetInitialsShorthand
