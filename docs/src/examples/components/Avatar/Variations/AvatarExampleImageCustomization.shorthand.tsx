import * as React from 'react'
import { Avatar } from '@stardust-ui/react'

const AvatarExampleImageCustomizationShorthand = () => (
  <>
    <Avatar
      image={{ src: 'public/images/avatar/small/matt.jpg', alt: 'Profile picture of John Doe' }}
      status={{ color: 'green', icon: 'check', title: 'Available' }}
    />
    &emsp;
    <Avatar
      image="public/images/avatar/large/jerry.png"
      status={{ color: 'green', icon: 'check', title: 'Available' }}
    />
  </>
)

export default AvatarExampleImageCustomizationShorthand
