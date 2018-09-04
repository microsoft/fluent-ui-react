import React from 'react'
import { Button, Icon, Text } from '@stardust-ui/react'

const ButtonExampleText = () => (
  <div>
    <Button text>
      <Icon name="book" xSpacing="after" />
      <Text content="Default" />
    </Button>
    <Button text type="primary">
      Primary
    </Button>
    <Button text type="secondary">
      Secondary
    </Button>
    <Button text circular>
      <Icon name="coffee" xSpacing="none" />
    </Button>
    <br />
    <br />
    <Button text fluid>
      Fluid
    </Button>
  </div>
)

export default ButtonExampleText
