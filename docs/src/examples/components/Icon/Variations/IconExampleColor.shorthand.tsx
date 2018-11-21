import React from 'react'
import { Icon } from '@stardust-ui/react'

const IconExampleColor = () => (
  <div>
    <Icon name="home" />
    <Icon name="home" variables={{ color: 'blue' }} />
    <Icon name="home" variables={{ color: 'red' }} />
    <Icon name="home" variables={{ color: 'orange' }} />
  </div>
)

export default IconExampleColor
