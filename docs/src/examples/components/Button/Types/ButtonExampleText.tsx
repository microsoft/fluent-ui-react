import * as React from 'react'
import { Button, Text, Icon } from '@stardust-ui/react'

const ButtonExampleText = () => (
  <div>
    <Button text>
      <Text content="A text button" />
    </Button>
    <br />
    <br />
    <Button text>
      <Icon name="call-video" />
      <Text content="A text button with an icon" />
    </Button>
    <br />
    <br />
    <Button text iconOnly>
      <Icon name="call-video" />
    </Button>
  </div>
)

export default ButtonExampleText
