import * as React from 'react'
import { Flex, Button } from '@stardust-ui/react'

const FlexExampleShorthand = () => (
  <Flex column height="300px" center space="around">
    <Button content="Hello" />
    <Button content="Another" />
    <Button content="One" />
  </Flex>
)

export default FlexExampleShorthand
