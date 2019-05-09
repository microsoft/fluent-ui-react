import * as React from 'react'
import { Avatar } from '@stardust-ui/react'

const avatar = (
  <Avatar
    image={{
      src: 'public/images/avatar/small/matt.jpg',
      alt: 'Profile picture of John Doe',
    }}
    status={{
      color: 'green',
      icon: 'check',
      title: 'Available',
    }}
  />
)

export default avatar
