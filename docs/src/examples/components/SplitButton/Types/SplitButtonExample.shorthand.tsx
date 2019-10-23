import * as React from 'react'
import { SplitButton } from '@stardust-ui/react'

const SplitButtonExampleShorthand = () => (
  <div>
    <SplitButton
      menu={[
        { key: 'group', content: 'New group message' },
        { key: 'channel', content: 'New channel message' },
      ]}
      button={{
        content: 'New conversation',
        'aria-roledescription': 'splitbutton',
        'aria-describedby': 'instruction-message',
      }}
      toggleButton={{ 'aria-label': 'more options' }}
      onMainButtonClick={() => alert('button was clicked')}
    />
    <span aria-hidden="true" id="instruction-message" style={{ opacity: 0 }}>
      to open menu, press Alt + Arrow Down
    </span>
  </div>
)

export default SplitButtonExampleShorthand
