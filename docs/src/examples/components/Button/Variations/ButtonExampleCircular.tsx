import * as React from 'react'
import { Button, Flex, Icon } from '@stardust-ui/react'

const ButtonExampleCircular = () => (
  <Flex gap="gap.smaller">
    <Button circular>C</Button>
    <Button circular icon>
      <Icon name="emoji" xSpacing="none" />
    </Button>
    <Button circular icon primary>
      <Icon name="broadcast" xSpacing="none" />
    </Button>
  </Flex>
)

export default ButtonExampleCircular
