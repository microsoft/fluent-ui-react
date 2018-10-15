import React from 'react'
import { Icon } from '@stardust-ui/react'

const IconExampleColor = () => (
  <div>
    <Icon name="call" />
    <Icon name="call" variables={{ color: 'blue' }} />
    <Icon name="call" variables={{ color: 'red' }} />
    <Icon name="home" variables={{ color: 'orange' }} />
  </div>
)

export default IconExampleColor
