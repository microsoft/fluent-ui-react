import React from 'react'
import { Avatar } from '@stardust-ui/react'

const statusIndicators = {
  available: {
    icon: { name: 'check', variables: { color: 'white', backgroundColor: 'green' } },
    title: 'Available',
  },
  busy: {
    icon: { variables: { color: 'white', backgroundColor: 'red' } },
    title: 'Busy',
  },
  away: {
    icon: { name: 'clock', variables: { color: 'white', backgroundColor: 'yellow' } },
    title: 'Away',
  },
  doNotDisturb: {
    icon: { name: 'minus', variables: { color: 'white', backgroundColor: 'red' } },
    title: 'Do not disturb',
  },
  offline: {
    icon: { variables: { color: 'white', backgroundColor: 'grey' } },
    title: 'Offline',
  },
}

const AvatarExampleStatusShorthand = () => (
  <div>
    <Avatar src="public/images/avatar/small/matt.jpg" status={statusIndicators.available} />
    &emsp;
    <Avatar src="public/images/avatar/small/matt.jpg" status={statusIndicators.busy} />
    &emsp;
    <Avatar src="public/images/avatar/small/matt.jpg" status={statusIndicators.doNotDisturb} />
    &emsp;
    <Avatar src="public/images/avatar/small/matt.jpg" status={statusIndicators.away} />
    &emsp;
    <Avatar src="public/images/avatar/small/matt.jpg" status={statusIndicators.offline} />
    &emsp;
  </div>
)

export default AvatarExampleStatusShorthand
