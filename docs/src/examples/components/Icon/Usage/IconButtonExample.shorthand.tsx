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
      <Text content="Phone home" />
    </Button>
    <Button type="primary" disabled icon iconPosition="before">
      <Icon name="home" xSpacing="after" />
      <Text content="Disabled button with icon" />
    </Button>
  </div>
)

export default IconExampleButton
