import * as React from 'react'
import { Button, Flex, Text } from '@stardust-ui/react'

const ButtonExampleIconOnly = () => (
  <div>
    <Flex gap="gap.large" vAlign="center">
      <Button icon="stardust-close" iconOnly />
      <Text content="AS A DEFAULT BUTTON" weight="bold" />
    </Flex>
    <Flex gap="gap.large" vAlign="center">
      <Button icon="stardust-close" text iconOnly />
      <Text content="AS A TEXT BUTTON" weight="bold" />
    </Flex>
  </div>
)

export default ButtonExampleIconOnly
