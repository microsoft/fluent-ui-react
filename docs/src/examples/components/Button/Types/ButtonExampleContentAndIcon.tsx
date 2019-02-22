import * as React from 'react'
import { Button, Flex, Icon, Text } from '@stardust-ui/react'

const ButtonExampleContentAndIcon = () => (
  <Flex gap="gap.small">
    <Button icon iconPosition="before" primary>
      <Icon name="book" xSpacing="after" variables={{ color: 'white' }} />
      <Text content="Click me before" />
    </Button>
    <Button icon iconPosition="after" secondary>
      <Text content="Click me after" />
      <Icon name="coffee" xSpacing="before" />
    </Button>
  </Flex>
)

export default ButtonExampleContentAndIcon
