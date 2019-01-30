import * as React from 'react'
import { Flex, Input, Button, Label } from '@stardust-ui/react'

const FlexExampleShorthand = () => (
  <>
    <Flex gap={15} debug>
      <Flex.Item stretch>
        <Flex.Row>
          <Label
            icon="plane"
            styles={{ background: 'darkgrey', height: 'auto', padding: '0 15px' }}
          />

          <Flex.Item stretch>
            <Input placeholder="Enter your flight #" fluid />
          </Flex.Item>
        </Flex.Row>
      </Flex.Item>

      <Button content="Load" />
    </Flex>
  </>
)

export default FlexExampleShorthand
