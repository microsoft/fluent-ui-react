import React from 'react'
import { Icon, Button, Text } from '@stardust-ui/react'

const IconExampleButton = () => (
  <div>
    <Button type="primary" icon iconPosition="before">
      <Icon name="call" xSpacing="after" />
      <Text content="Call now" />
    </Button>
    <Button type="secondary" icon iconPosition="before">
      <Icon name="home" xSpacing="after" />
      <Text content="Call now" />
    </Button>
  </div>
)

export default IconExampleButton
