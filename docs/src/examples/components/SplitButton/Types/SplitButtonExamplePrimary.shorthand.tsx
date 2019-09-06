import * as React from 'react'
import { SplitButton } from '@stardust-ui/react'

const SplitButtonExamplePrimaryShorthand = () => (
  <SplitButton
    menu={[
      { key: 'group', content: 'New group message' },
      { key: 'channel', content: 'New channel message' },
    ]}
    button="New conversation"
    primary
  />
)

export default SplitButtonExamplePrimaryShorthand
