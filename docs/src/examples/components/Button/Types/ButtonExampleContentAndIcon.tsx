import React from 'react'
import { Button, Icon, Text } from '@stardust-ui/react'

const ButtonExampleContentAndIcon = () => (
  <div>
    <Button type="primary" icon iconPosition="before">
      <Icon name="book" xSpacing="after" variables={{ color: 'white' }} />
      <Text content="Click me before" />
    </Button>
    <Button icon iconPosition="after">
      <Text content="Click me after" />
      <Icon name="coffee" xSpacing="before" />
    </Button>
  </div>
)

export default ButtonExampleContentAndIcon
