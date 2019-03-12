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
      image="public/images/avatar/large/jerry.png"
      status={{ color: 'green', icon: 'check', title: 'Available' }}
    />
    &emsp;
    <Avatar
      image={
        // This example does not react to the avatar size variable
        // and otherwise produces bad results when border is applied compared to "normal" image
        <Icon
          name="user"
          circular
          bordered
          variables={{ color: 'blue' }}
          styles={{ boxSizing: 'border-box', padding: '8px' }}
        />
      }
      status={{ color: 'green', icon: 'check', title: 'Available' }}
    />
  </>
)

export default AvatarExampleImageCustomizationShorthand
