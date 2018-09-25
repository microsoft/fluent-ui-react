import React from 'react'
import { Avatar } from '@stardust-ui/react'

const AvatarExampleStatusCustomizationShorthand = () => (
  <Avatar
    image={{ src: 'public/images/avatar/small/matt.jpg', alt: 'Profile picture of Matt' }}
    status={{
      color: 'green',
      icon: 'check',
      title: 'Available',
    }}
    variables={{ statusBorderColor: '#d3d3d3' }}
  />
)

export default AvatarExampleStatusCustomizationShorthand
