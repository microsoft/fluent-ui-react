import React from 'react'
import { Icon } from '@stardust-ui/react'

const IconExampleColor = () => (
  <div>
    {/* The colors for the icon and the border are inherited. */}
    <div style={{ color: 'violet', padding: '1rem', display: 'inline-block' }}>
      <Icon name="calendar" bordered />
      <Icon name="call" bordered />
      <Icon name="call-video" bordered />
    </div>
    {/* The colors for the icon and the border are inherited for the outlined icons as well. */}
    <div style={{ color: 'yellowgreen', padding: '1rem', display: 'inline-block' }}>
      <Icon name="calendar" bordered variables={{ outline: true }} />
      <Icon name="call" bordered variables={{ outline: true }} />
      <Icon name="call-video" bordered variables={{ outline: true }} />
    </div>
    {/* The color variable can change the color used for the icon, as well as the border. */}
    <div style={{ padding: '1rem', display: 'inline-block' }}>
      <Icon name="calendar" bordered variables={{ color: 'violet' }} />
      <Icon name="call" bordered variables={{ color: 'yellowgreen' }} />
      <Icon name="call-video" bordered variables={{ color: 'cornflowerblue' }} />
    </div>
    {/* The borderColor variable can change the color used for the border. */}
    <div style={{ padding: '1rem', display: 'inline-block' }}>
      <Icon
        name="calendar"
        bordered
        variables={{ color: 'cornflowerblue', borderColor: 'violet' }}
      />
      <Icon
        name="call"
        bordered
        variables={{ color: 'cornflowerblue', borderColor: 'yellowgreen' }}
      />
      <Icon
        name="call-video"
        bordered
        variables={{ color: 'cornflowerblue', borderColor: 'orangered' }}
      />
    </div>
  </div>
)

export default IconExampleColor
