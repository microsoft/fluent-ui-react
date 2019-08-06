import * as React from 'react'
import { Button, Flex } from '@stardust-ui/react'

const ButtonExampleDisabled = () => (
  <Flex column gap="gap.smaller">
    <Flex gap="gap.smaller">
      <Button disabled content="Default" />
      <Button disabled content="Primary" primary />
      <Button disabled content="Secondary" secondary />
      <Button disabled icon="emoji" content="Click me" iconPosition="before" primary />
      <Button disabled circular icon="translation" />
    </Flex>
    <Button disabled fluid content="Fluid" />
  </Flex>
)

export default ButtonExampleDisabled
