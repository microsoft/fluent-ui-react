import React from 'react'
import { Avatar } from '@stardust-ui/react'

const status = { color: 'green', icon: 'check', title: 'Available' }

const AvatarUsageExampleShorthand = () => (
  <div>
    Correct:
    <div>
      <div style={{ backgroundColor: 'violet', padding: '1rem', display: 'inline-block' }}>
        <Avatar
          name="John Doe (Software Developer)"
          status={status}
          variables={{ status: { borderColor: 'violet' } }}
        />
      </div>
      <div style={{ backgroundColor: 'yellowgreen', padding: '1rem', display: 'inline-block' }}>
        <Avatar
          name="John Doe (Software Developer)"
          status={status}
          variables={{ status: { borderColor: 'yellowgreen' } }}
        />
      </div>
      <div style={{ backgroundColor: 'orangered', padding: '1rem', display: 'inline-block' }}>
        <Avatar
          name="John Doe (Software Developer)"
          status={status}
          variables={{ status: { borderColor: 'orangered' } }}
        />
      </div>
      <div style={{ backgroundColor: 'cornflowerblue', padding: '1rem', display: 'inline-block' }}>
        <Avatar
          name="John Doe (Software Developer)"
          status={status}
          variables={{ status: { borderColor: 'cornflowerblue' } }}
        />
      </div>
    </div>
    Incorrect (Border should not be visible, unless in Contrast theme):
    <div>
      <div style={{ backgroundColor: 'violet', padding: '1rem', display: 'inline-block' }}>
        <Avatar name="John Doe (Software Developer)" status={status} />
      </div>
      <div style={{ backgroundColor: 'yellowgreen', padding: '1rem', display: 'inline-block' }}>
        <Avatar name="John Doe (Software Developer)" status={status} />
      </div>
      <div style={{ backgroundColor: 'orangered', padding: '1rem', display: 'inline-block' }}>
        <Avatar name="John Doe (Software Developer)" status={status} />
      </div>
      <div style={{ backgroundColor: 'cornflowerblue', padding: '1rem', display: 'inline-block' }}>
        <Avatar name="John Doe (Software Developer)" status={status} />
      </div>
    </div>
  </div>
)

export default AvatarUsageExampleShorthand
