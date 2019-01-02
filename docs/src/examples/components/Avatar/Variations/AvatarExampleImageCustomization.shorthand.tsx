import * as React from 'react'
import { Avatar, Icon } from '@stardust-ui/react'

const AvatarExampleImageCustomizationShorthand = () => (
  <>
    <Avatar
      image={{ src: 'public/images/avatar/small/matt.jpg', alt: 'Profile picture of John Doe' }}
      status={{ color: 'green', icon: 'check', title: 'Available' }}
    />
    &emsp;
    <Avatar
      image={
        <Icon name="user" circular variables={{ color: 'blue' }} styles={{ padding: '8px' }} />
      }
      status={{ color: 'green', icon: 'check', title: 'Available' }}
    />
  </>
)

export default AvatarExampleImageCustomizationShorthand
