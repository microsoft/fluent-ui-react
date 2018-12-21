import * as React from 'react'
import { Button, Icon } from '@stardust-ui/react'

const ButtonExampleEmphasisCircular = () => (
  <div>
    <Button circular icon primary>
      <Icon name="coffee" xSpacing="none" />
    </Button>
    <Button circular icon secondary>
      <Icon name="book" xSpacing="none" />
    </Button>
  </div>
)

export default ButtonExampleEmphasisCircular
