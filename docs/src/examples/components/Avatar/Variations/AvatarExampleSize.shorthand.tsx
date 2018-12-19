import * as _ from 'lodash'
import * as React from 'react'
import { Avatar } from '@stardust-ui/react'

const statusProps = { icon: 'check', color: 'green', title: 'Available' }

const AvatarExampleSizeShorthand = () =>
  _.times(7, i => {
    const size = 20 + i * 4
    const status = { ...statusProps, size: size * 0.3125 }

    return (
      <p key={size}>
        <strong>{size}</strong>
        &emsp;
        <Avatar size={size} image="public/images/avatar/small/matt.jpg" status={status} />
        &emsp;
        <Avatar size={size} name="John Doe" status={status} />
        &emsp;
        <Avatar size={size} image="public/images/avatar/small/matt.jpg" />
      </p>
    )
  })

export default AvatarExampleSizeShorthand
