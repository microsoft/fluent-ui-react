import * as React from 'react'
import { Flex, Button } from '@stardust-ui/react'

const FlexExampleShorthand = () => (
  <>
    <Flex.Row gap="10px" debug>
      <Button content="Logo" icon="chess rook" />

      <Flex.Item push>
        <Button content="Page 1" />
      </Flex.Item>

      <Button content="Page 2" />
      <Button content="Page 3" />
    </Flex.Row>
  </>
)

export default FlexExampleShorthand
