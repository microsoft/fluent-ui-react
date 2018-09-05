import React from 'react'
import { Avatar } from '@stardust-ui/react'

const Available = {
  icon: { name: 'check', variables: { color: 'white', backgroundColor: 'green' } },
  title: 'Available',
}

const AvatarExampleStatusIndicatorCustomizationShorthand = () => (
  <Avatar
    src="public/images/avatar/small/matt.jpg"
    alt="Profile picture of Matt"
    status={Available}
    variables={{ statusIndicatorBackground: '#d3d3d3' }}
  />
)

export default AvatarExampleStatusIndicatorCustomizationShorthand
