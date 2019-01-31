import * as React from 'react'
import { Flex as Row, Input, Button, Label } from '@stardust-ui/react'

const FlexExampleShorthand = () => (
  <>
    <Row gap={15} debug>
      <Row.Item stretch>
        <Row>
          <Label
            icon="plane"
            styles={{ background: 'darkgrey', height: 'auto', padding: '0 15px' }}
          />

          <Row.Item stretch>
            <Input placeholder="Enter your flight #" fluid />
          </Row.Item>
        </Row>
      </Row.Item>

      <Button content="Load" />
    </Row>
  </>
)

export default FlexExampleShorthand
