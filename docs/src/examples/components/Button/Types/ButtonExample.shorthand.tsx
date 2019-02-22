import * as React from 'react'
import { Button, Flex } from '@stardust-ui/react'

const ButtonExample = () => (
  <Flex gap="gap.small">
    <Button content="Click here" />
    <Button content="See how this very long text shows up on the button" />
  </Flex>
)

export default ButtonExample
