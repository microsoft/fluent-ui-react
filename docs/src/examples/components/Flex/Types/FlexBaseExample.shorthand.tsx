import * as React from 'react'
import { Flex, Button } from '@stardust-ui/react'

const FlexExampleShorthand = () => (
  <>
    <Flex.Column height="300px" center space="around">
      <Flex.Item align="start">
        <Button content="Hello" />
      </Flex.Item>

      <Button content="Another" />

      <Flex.Item align="end">
        <Button content="One" />
      </Flex.Item>
    </Flex.Column>
  </>
)

export default FlexExampleShorthand
