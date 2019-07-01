import * as React from 'react'
import { Button, Text, Toolbar } from '@stardust-ui/react'

const ToolbarExampleCustomContentShorthand = () => (
  <Toolbar
    items={[
      { key: 'bold', icon: 'bold' },
      {
        key: 'custom-text',
        kind: 'custom',
        content: <Text content="text" />,
      },
      {
        key: 'custom-button',
        kind: 'custom',
        fitted: 'horizontally',
        content: <Button content="button" />,
      },
    ]}
  />
)

export default ToolbarExampleCustomContentShorthand
