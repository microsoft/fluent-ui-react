import * as React from 'react'
import { Button, Flex } from '@stardust-ui/react'

const ButtonExampleContentAndIcon = () => (
  <Flex gap="gap.smaller">
    <Button icon="emoji" content="Click me before" iconPosition="before" primary />
    <Button icon="translation" content="Click me after" iconPosition="after" secondary />
  </Flex>
)

export default ButtonExampleContentAndIcon
