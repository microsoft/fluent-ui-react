import React from 'react'
import { Avatar } from '@stardust-ui/react'

const AvatarExampleStatusIndicatorCustomizationShorthand = () => (
  <Avatar
    src="public/images/avatar/small/matt.jpg"
    alt="Profile picture of Matt"
    status={{
      color: 'green',
      icon: 'check',
      title: 'Available',
    }}
    variables={{ statusIndicatorBorderColor: '#d3d3d3' }}
  />
)

export default AvatarExampleStatusIndicatorCustomizationShorthand
