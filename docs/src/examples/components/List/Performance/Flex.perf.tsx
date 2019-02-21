import * as React from 'react'
import { Flex } from '@stardust-ui/react'

const FlexExampleInput = () => (
  <Flex>
    <Flex.Item size="size.medium">
      <div>Media</div>
    </Flex.Item>

    <Flex.Item grow>
      <div>
        <Flex>
          <Flex.Item grow>
            <div>Header</div>
          </Flex.Item>
          <Flex.Item size="size.small">
            <div>Media</div>
          </Flex.Item>
        </Flex>

        <Flex>
          <Flex.Item grow>
            <div>Content</div>
          </Flex.Item>
          <Flex.Item size="size.small">
            <div>Media</div>
          </Flex.Item>
        </Flex>
      </div>
    </Flex.Item>

    <Flex.Item size="size.small">
      <div>End Media</div>
    </Flex.Item>
  </Flex>
)

export default FlexExampleInput
