import * as React from 'react'
import { Button, Flex } from '@fluentui/react'

const ButtonExampleContentAndIcon = () => (
  <Flex gap="gap.large">
    <Button icon={{ name: 'call-video' }} content="Join call" iconPosition="before" primary />
    <Button icon={{ name: 'call-video' }} content="Join call" iconPosition="after" />
    <Button icon={{ name: 'call-video' }} content="Join call" text />
  </Flex>
)

export default ButtonExampleContentAndIcon
