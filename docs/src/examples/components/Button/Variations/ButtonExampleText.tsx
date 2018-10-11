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
    <Button text>Secondary</Button>
    <Button text circular>
      <Icon name="compass outline" xSpacing="none" />
    </Button>
  </div>
)

export default ButtonExampleText
