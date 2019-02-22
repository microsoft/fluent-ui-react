import * as React from 'react'
import { Button, Flex } from '@stardust-ui/react'

const ButtonExampleTextShorthand = () => (
  <Flex gap="gap.smaller">
    <Button text icon="book" content="Default" iconPosition="before" />
    <Button text content="Primary" primary />
    <Button text content="Secondary" secondary />
    <Button text iconOnly icon="compass outline" />
  </Flex>
)

export default ButtonExampleTextShorthand
