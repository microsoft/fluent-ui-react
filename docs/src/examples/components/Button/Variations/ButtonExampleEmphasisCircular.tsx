import React from 'react'
import { Button, Icon } from '@stardust-ui/react'

const ButtonExampleEmphasisCircular = () => (
  <div>
    <Button type="primary" circular icon>
      <Icon name="coffee" xSpacing="none" />
    </Button>
    <Button type="secondary" circular icon>
      <Icon name="book" xSpacing="none" />
    </Button>
  </div>
)

export default ButtonExampleEmphasisCircular
