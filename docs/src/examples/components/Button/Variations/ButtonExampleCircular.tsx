import * as React from 'react'
import { Button, Flex, Icon } from '@stardust-ui/react'

const ButtonExampleCircular = () => (
  <Flex gap="gap.smaller">
    <Button circular>C</Button>
    <Button circular icon>
      <Icon name="book" xSpacing="none" />
    </Button>
  </Flex>
)

export default ButtonExampleCircular
