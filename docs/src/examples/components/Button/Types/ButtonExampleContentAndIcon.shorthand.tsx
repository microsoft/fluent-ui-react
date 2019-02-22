import * as React from 'react'
import { Button, Flex } from '@stardust-ui/react'

const ButtonExampleContentAndIcon = () => (
  <Flex gap="gap.smaller">
    <Button icon="book" content="Click me before" iconPosition="before" primary />
    <Button icon="coffee" content="Click me after" iconPosition="after" secondary />
  </Flex>
)

export default ButtonExampleContentAndIcon
