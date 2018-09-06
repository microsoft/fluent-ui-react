import React from 'react'
import { Avatar, StatusIndicator } from '@stardust-ui/react'

const StatusIndicatorWrapper = (status: string) => {
  switch (status) {
    case 'Available':
      return (
        <StatusIndicator
          icon={{ name: 'check', variables: { color: 'white', backgroundColor: 'green' } }}
          title="Available"
        />
      )
    case 'Away':
      return {
        icon: { name: 'clock', variables: { color: 'white', backgroundColor: 'yellow' } },
        title: 'Away',
      }
    case 'Busy':
      return (
        <StatusIndicator
          icon={{ name: '', variables: { color: 'white', backgroundColor: 'red' } }}
          title="Busy"
        />
      )
    case 'DoNotDisturb':
      return (
        <StatusIndicator
          icon={{ name: 'minus', variables: { color: 'white', backgroundColor: 'red' } }}
          title="Do not disturb"
        />
      )
    case 'BeRightBack':
      return (
        <StatusIndicator
          icon={{ name: 'clock', variables: { color: 'white', backgroundColor: 'yellow' } }}
          title="Be right back"
        />
      )
    case 'Offline':
      return (
        <StatusIndicator
          icon={{ name: '', variables: { color: 'white', backgroundColor: 'grey' } }}
          title="Offline"
        />
      )
    case 'PresenceUnknown':
    default:
      return <StatusIndicator title="Presence Unknown" />
  }
}

const AvatarExampleStatusShorthand = () => (
  <div>
    <Avatar
      src="public/images/avatar/small/matt.jpg"
      status={StatusIndicatorWrapper('Available')}
    />
    &emsp;
    <Avatar src="public/images/avatar/small/matt.jpg" status={StatusIndicatorWrapper('Busy')} />
    &emsp;
    <Avatar
      src="public/images/avatar/small/matt.jpg"
      status={StatusIndicatorWrapper('DoNotDisturb')}
    />
    &emsp;
    <Avatar src="public/images/avatar/small/matt.jpg" status={StatusIndicatorWrapper('Away')} />
    &emsp;
    <Avatar
      src="public/images/avatar/small/matt.jpg"
      status={StatusIndicatorWrapper('BeRightBack')}
    />
    &emsp;
    <Avatar src="public/images/avatar/small/matt.jpg" status={StatusIndicatorWrapper('Offline')} />
    &emsp;
    <Avatar
      src="public/images/avatar/small/matt.jpg"
      status={StatusIndicatorWrapper('PresenceUnknown')}
    />
    &emsp;
  </div>
)

export default AvatarExampleStatusShorthand
