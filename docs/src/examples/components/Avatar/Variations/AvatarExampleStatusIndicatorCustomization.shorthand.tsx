import React from 'react'
import { Avatar } from '@stardust-ui/react'

const availableStatus = {
  icon: { name: 'check', variables: { color: 'white', backgroundColor: 'green' } },
  title: 'Available',
}

const AvatarExampleStatusIndicatorCustomizationShorthand = () => (
  <Avatar
    image={{ src: 'public/images/avatar/small/matt.jpg', alt: 'Profile picture of Matt' }}
    status={availableStatus}
    variables={{ statusIndicatorBackground: '#d3d3d3' }}
  />
)

export default AvatarExampleStatusIndicatorCustomizationShorthand
