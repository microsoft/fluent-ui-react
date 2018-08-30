import _ from 'lodash'
import React from 'react'
import { Avatar2, Provider } from '@stardust-ui/react'

const Avatar2ExampleSizeShorthand = () => (
  <div>
    I'd like to iterate through sizes here: &emsp;
    <Avatar2
      src="public/images/avatar/small/matt.jpg"
      avatarSize="medium"
      avatarType="bot"
      avatarState="PresenceUnknown"
    />
    <Avatar2
      src="public/images/avatar/small/matt.jpg"
      avatarSize="xlarge"
      avatarType="person"
      avatarState="Available"
    />
    <br />
    Theme here:
    <Provider.Consumer
      render={theme => <pre>{JSON.stringify(theme.componentVariables.Avatar2, null, 2)}</pre>}
    />
    <br />
    End Theme.
  </div>
)

export default Avatar2ExampleSizeShorthand
