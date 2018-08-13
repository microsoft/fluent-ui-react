import React from 'react'
import { Avatar } from '@stardust-ui/react'

const AvatarExamplePresenceIndicatorCustomizationShorthand = () => (
  <Avatar
    src="public/images/avatar/small/matt.jpg"
    alt="Profile picture of Matt"
    status="Available"
    variables={{ presenceIndicatorBackground: '#d3d3d3' }}
  />
)

export default AvatarExamplePresenceIndicatorCustomizationShorthand
