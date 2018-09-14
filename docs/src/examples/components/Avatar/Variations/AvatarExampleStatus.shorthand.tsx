import React from 'react'
import { Avatar } from '@stardust-ui/react'

const AvatarExampleStatusShorthand = () => (
  <div>
    <Avatar
      src="public/images/avatar/small/matt.jpg"
      status={{ color: 'green', icon: 'check', title: 'Available' }}
    />
    &emsp;
    <Avatar src="public/images/avatar/small/matt.jpg" status={{ color: 'red', title: 'Busy' }} />
    &emsp;
    <Avatar
      src="public/images/avatar/small/matt.jpg"
      status={{ color: 'red', icon: 'minus', title: 'Do not disturb' }}
    />
    &emsp;
    <Avatar
      src="public/images/avatar/small/matt.jpg"
      status={{ color: 'yellow', icon: 'clock', title: 'Away' }}
    />
    &emsp;
    <Avatar
      src="public/images/avatar/small/matt.jpg"
      status={{ color: 'grey', title: 'Offline' }}
    />
    &emsp;
  </div>
)

export default AvatarExampleStatusShorthand
