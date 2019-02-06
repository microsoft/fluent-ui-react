import * as React from 'react'
import { Flex, Input, Button, Label } from '@stardust-ui/react'

const FlexExampleShorthand = () => (
  <>
    <Flex gap={15} debug>
      <Flex.Item grow>
        <Flex>
          <Label
            icon="plane"
            styles={{ background: 'darkgrey', height: 'auto', padding: '0 15px' }}
          />

          <Flex.Item grow>
            <Input placeholder="Enter your flight #" fluid />
          </Flex.Item>
        </Flex>
      </Flex.Item>

      <Button content="Load" />
    </Flex>
  </>
)

export default FlexExampleShorthand
