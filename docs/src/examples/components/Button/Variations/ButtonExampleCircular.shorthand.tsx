import * as React from 'react'
import { Button, Flex } from '@fluentui/react'

const ButtonExampleCircular = () => (
  <Flex gap="gap.smaller">
    <Button circular content="C" />
    <Button circular icon={{ name: 'emoji' }} title="Emoji" />
    <Button circular icon={{ name: 'broadcast' }} primary title="Broadcast" />
  </Flex>
)
export default ButtonExampleCircular
