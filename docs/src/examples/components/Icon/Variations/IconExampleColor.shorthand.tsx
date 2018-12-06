import React from 'react'
import { Icon } from '@stardust-ui/react'

const IconExampleColor = () => (
  <div>
    <div style={{ color: 'violet', padding: '1rem', display: 'inline-block' }}>
      <Icon name="calendar" bordered />
      <Icon name="call" bordered />
      <Icon name="call-video" bordered />
    </div>
    <div style={{ color: 'yellowgreen', padding: '1rem', display: 'inline-block' }}>
      <Icon name="calendar" bordered variables={{ outline: true }} />
      <Icon name="call" bordered variables={{ outline: true }} />
      <Icon name="call-video" bordered variables={{ outline: true }} />
    </div>
    <div style={{ color: 'cornflowerblue', padding: '1rem', display: 'inline-block' }}>
      <Icon name="calendar" bordered variables={{ borderColor: 'violet' }} />
      <Icon name="call" bordered variables={{ borderColor: 'yellowgreen' }} />
      <Icon name="call-video" bordered variables={{ borderColor: 'orangered' }} />
    </div>
    <div style={{ padding: '1rem', display: 'inline-block' }}>
      <Icon name="calendar" bordered variables={{ color: 'violet' }} />
      <Icon name="call" bordered variables={{ color: 'yellowgreen' }} />
      <Icon name="call-video" bordered variables={{ color: 'cornflowerblue' }} />
    </div>
  </div>
)

export default IconExampleColor
