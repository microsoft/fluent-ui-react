import React from 'react'
import { Icon } from '@stardust-ui/react'

const IconExampleDisabled = () => (
  <div>
    <Icon disabled name="call-video" xSpacing="after" />
    <Icon disabled name="call-video" xSpacing="after" variables={{ color: 'blue' }} />
    <Icon disabled name="call-video" xSpacing="after" variables={{ color: 'red' }} />
    <Icon disabled name="call-video" xSpacing="after" variables={{ color: 'orange' }} />
  </div>
)

export default IconExampleDisabled
