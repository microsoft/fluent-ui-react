import React from 'react'
import { Button, Icon, Text } from '@stardust-ui/react'

const ButtonExampleDisabled = () => (
  <div>
    <Button disabled>Default</Button>
    <Button disabled type="primary">
      Primary
    </Button>
    <Button disabled type="secondary">
      Secondary
    </Button>
    <Button disabled type="primary" icon iconPosition="before">
      <Icon name="book" xSpacing="after" />
      <Text content="Click me" />
    </Button>
    <Button disabled circular>
      <Icon name="coffee" xSpacing="none" />
    </Button>
    <br />
    <br />
    <Button disabled fluid>
      Fluid
    </Button>
  </div>
)

export default ButtonExampleDisabled
