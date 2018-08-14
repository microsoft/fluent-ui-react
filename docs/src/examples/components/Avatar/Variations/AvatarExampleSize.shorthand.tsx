import _ from 'lodash'
import React from 'react'
import { Avatar } from '@stardust-ui/react'

const AvatarExampleSizeShorthand = () =>
  _.times(10, i => {
    const size = i + 1
    return (
      <div key={size}>
        <Avatar size={size} src="public/images/avatar/small/matt.jpg" status="Available" />
        &emsp;
        <Avatar size={size} name="John Doe" status="Available" />
        &emsp;
        <Avatar size={size} src="public/images/avatar/small/matt.jpg" />
      </div>
    )
  })

export default AvatarExampleSizeShorthand
