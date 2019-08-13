import * as React from 'react'
import { Button, Flex } from '@stardust-ui/react'

const ButtonExampleCircular = () => (
  <Flex gap="gap.smaller">
    <Button circular content="C" />
    <Button circular icon="book" />
    <Button circular icon="coffee" primary />
  </Flex>
)
export default ButtonExampleCircular
