import * as React from 'react'
import { Button, Icon } from '@stardust-ui/react'

const ButtonExampleCircular = () => (
  <div>
    <Button circular>C</Button>
    <Button circular icon>
      <Icon name="book" xSpacing="none" />
    </Button>
  </div>
)

export default ButtonExampleCircular
