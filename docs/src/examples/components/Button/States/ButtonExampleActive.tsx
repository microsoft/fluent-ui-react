import React from 'react'
import { Button, Icon, Text } from '@stardust-ui/react'

const ButtonExampleActive = () => (
  <div>
    <Button active>Default</Button>
    <Button active type="primary">
      Primary
    </Button>
    <Button active type="secondary">
      Secondary
    </Button>
    <Button active type="primary" icon iconPosition="before">
      <Icon name="book" color="white" xSpacing="after" />
      <Text content="Click me" />
    </Button>
    <Button active circular>
      <Icon name="coffee" xSpacing="none" />
    </Button>
    <br />
    <br />
    <Button active fluid>
      Fluid
    </Button>
  </div>
)

export default ButtonExampleActive
