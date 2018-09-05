import React from 'react'
import { Avatar, StatusIndicator } from '@stardust-ui/react'

const AvatarExampleStatusIndicatorCustomizationShorthand = () => (
  <Avatar
    src="public/images/avatar/small/matt.jpg"
    alt="Profile picture of Matt"
    status={<StatusIndicator />}
    variables={{ statusIndicatorBackground: '#d3d3d3' }}
  />
)

export default AvatarExampleStatusIndicatorCustomizationShorthand
