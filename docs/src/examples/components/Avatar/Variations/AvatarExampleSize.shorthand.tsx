import _ from 'lodash'
import React from 'react'
import { Avatar } from '@stardust-ui/react'

const statusIndicator = { icon: 'check', title: 'Available' }

const AvatarExampleSizeShorthand = () =>
  _.times(7, i => {
    const size = 20 + i * 4
    return (
      <p key={size}>
        <strong>{size}</strong>
        &emsp;
        <Avatar size={size} src="public/images/avatar/small/matt.jpg" status={statusIndicator} />
        &emsp;
        <Avatar size={size} name="John Doe" status={statusIndicator} />
        &emsp;
        <Avatar size={size} src="public/images/avatar/small/matt.jpg" />
      </p>
    )
  })

export default AvatarExampleSizeShorthand
