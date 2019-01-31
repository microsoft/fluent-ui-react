import * as React from 'react'
import { Flex as Row, Button } from '@stardust-ui/react'

const FlexExampleShorthand = () => (
  <>
    <Row gap="10px" debug>
      <Button content="Logo" icon="chess rook" />

      <Row.Item push>
        <Button content="Page 1" />
      </Row.Item>

      <Button content="Page 2" />
      <Button content="Page 3" />
    </Row>
  </>
)

export default FlexExampleShorthand
