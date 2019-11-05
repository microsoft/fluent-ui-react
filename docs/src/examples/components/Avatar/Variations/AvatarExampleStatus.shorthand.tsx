import * as React from 'react'
import { Avatar } from '@stardust-ui/react'

const AvatarExampleStatusShorthand = () => (
  <div>
    <Avatar
      image="public/images/avatar/small/matt.jpg"
      status={{
        styles: { backgroundColor: 'green' },
        icon: 'stardust-checkmark',
        title: 'Available',
      }}
    />
    &emsp;
    <Avatar
      image="public/images/avatar/small/matt.jpg"
      status={{ styles: { backgroundColor: 'red' }, title: 'Busy' }}
    />
    &emsp;
    <Avatar
      image="public/images/avatar/small/matt.jpg"
      status={{ styles: { backgroundColor: 'grey' }, title: 'Offline' }}
    />
    &emsp;
  </div>
)

export default AvatarExampleStatusShorthand
