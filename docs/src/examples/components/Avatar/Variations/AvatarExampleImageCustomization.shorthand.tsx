import React from 'react'
import { Avatar, Icon } from '@stardust-ui/react'

const iconAsImage = (Image, props, children) => {
  return <Icon name="user" circular variables={{ color: 'blue' }} styles={{ fontSize: '16px' }} />
}

const AvatarExampleImageCustomizationShorthand = () => (
  <>
    <Avatar
      image={{ src: 'public/images/avatar/small/matt.jpg', alt: 'Profile picture of John Doe' }}
      status={{ color: 'green', icon: 'check', title: 'Available' }}
    />
    &emsp;
    <Avatar image={iconAsImage} status={{ color: 'green', icon: 'check', title: 'Available' }} />
  </>
)

export default AvatarExampleImageCustomizationShorthand
