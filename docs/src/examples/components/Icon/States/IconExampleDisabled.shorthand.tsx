import React from 'react'
import { Icon } from '@stardust-ui/react'

const IconExampleDisabled = () => (
  <div>
    <Icon disabled name="users" size="big" />
    <Icon disabled name="users" size="big" variables={{ color: 'red' }} />
    <Icon disabled name="users" size="big" variables={{ color: 'orange' }} />
    <Icon disabled name="users" size="big" variables={{ color: 'yellow' }} />
  </div>
)

export default IconExampleDisabled
