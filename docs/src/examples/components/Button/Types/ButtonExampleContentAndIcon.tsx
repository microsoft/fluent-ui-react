import React from 'react'
import { Button, Icon, Text } from '@stardust-ui/react'

const ButtonExampleContentAndIcon = () => (
  <div>
    <Button type="primary" icon iconPosition="before">
      <Icon name="book" color="white" xSpacing="after" />
      <Text content="Click me before" />
    </Button>
    <Button type="secondary" icon iconPosition="after">
      <Text content="Click me after" />
      <Icon name="coffee" xSpacing="before" />
    </Button>
  </div>
)

export default ButtonExampleContentAndIcon
