import * as React from 'react'
import { Button, Flex, Text, Icon } from '@stardust-ui/react'

const ButtonExampleIconOnly = () => (
  <div>
    <Flex gap="gap.large" vAlign="center">
      <Button iconOnly>
        <Icon name="stardust-close" xSpacing="none" />
      </Button>
      <Text content="AS A DEFAULT BUTTON" weight="bold" />
    </Flex>
    <Flex gap="gap.large" vAlign="center">
      <Button iconOnly text>
        <Icon name="stardust-close" xSpacing="none" />
      </Button>
      <Text content="AS A TEXT BUTTON" weight="bold" />
    </Flex>
  </div>
)

export default ButtonExampleIconOnly
