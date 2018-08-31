import _ from 'lodash'
import React from 'react'
import { Avatar2, Provider, themes } from '@stardust-ui/react'

const Avatar2ExampleSizeShorthand = () => (
  <div>
    I'd like to iterate through sizes here: &emsp;
    <Avatar2
      src="public/images/avatar/small/matt.jpg"
      avatarSize="medium"
      avatarType="bot"
      avatarState="unknown"
    />
    <Avatar2
      src="public/images/avatar/small/matt.jpg"
      avatarSize="xlarge"
      avatarType="person"
      avatarState="available"
    />
    <Provider.Consumer
      render={theme => <pre>{JSON.stringify(theme.componentVariables.Avatar2())}</pre>}
    />
    <Provider.Consumer render={theme => <pre>{JSON.stringify(theme)}</pre>} />
  </div>
)

export default Avatar2ExampleSizeShorthand
