import _ from 'lodash'
import React from 'react'
import { Avatar } from '@stardust-ui/react'

const availableStatus = {
  icon: { name: 'check', variables: { color: 'white', backgroundColor: 'green' } },
  title: 'Available',
}

const AvatarExampleSizeShorthand = () =>
  _.times(10, i => {
    const size = i + 1
    return (
      <div key={size}>
        <Avatar size={size} image="public/images/avatar/small/matt.jpg" status={availableStatus} />
        &emsp;
        <Avatar size={size} name="John Doe" status={availableStatus} />
        &emsp;
        <Avatar size={size} image="public/images/avatar/small/matt.jpg" />
      </div>
    )
  })

export default AvatarExampleSizeShorthand
