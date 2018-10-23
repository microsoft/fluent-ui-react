import React from 'react'
import { Avatar } from '@stardust-ui/react'

const AvatarExampleStatusShorthand = () => (
  <div>
    <Avatar
      image="public/images/avatar/small/matt.jpg"
      status={{ state: 'success', icon: 'check', title: 'Available' }}
    />
    &emsp;
    <Avatar
      image="public/images/avatar/small/matt.jpg"
      status={{ state: 'error', title: 'Busy' }}
    />
    &emsp;
    <Avatar
      image="public/images/avatar/small/matt.jpg"
      status={{ state: 'error', icon: 'minus', title: 'Do not disturb' }}
    />
    &emsp;
    <Avatar
      image="public/images/avatar/small/matt.jpg"
      status={{ state: 'warning', icon: 'clock', title: 'Away' }}
    />
    &emsp;
    <Avatar
      image="public/images/avatar/small/matt.jpg"
      status={{ state: 'error', title: 'Offline' }}
    />
    &emsp;
    <Avatar
      image="public/images/avatar/small/matt.jpg"
      status={{ state: 'unknown', title: 'Offline' }}
    />
    &emsp;
  </div>
)

export default AvatarExampleStatusShorthand
