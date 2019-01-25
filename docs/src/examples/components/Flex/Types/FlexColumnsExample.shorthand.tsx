import * as React from 'react'
import { Flex, Segment } from '@stardust-ui/react'

const FlexExampleShorthand = () => (
  <>
    <Flex.Row gap="10px" padding="10px">
      <Flex.Item size="50%">
        <Segment content="1/2" />
      </Flex.Item>

      <Flex.Item size="50%">
        <Segment content="1/2" />
      </Flex.Item>
    </Flex.Row>

    <Flex.Row gap="10px" padding="10px">
      <Flex.Item size="25%">
        <Segment content="1/4" />
      </Flex.Item>

      <Flex.Item size="50%">
        <Segment content="1/2" />
      </Flex.Item>

      <Flex.Item size="25%">
        <Segment content="1/4" />
      </Flex.Item>
    </Flex.Row>

    <Flex.Row gap="10px" padding="10px" style={{ minHeight: 200 }}>
      <Flex.Item size="50%">
        <Segment content="Full-height, even when my content doesn't fill the space." />
      </Flex.Item>

      <Flex.Item size="50%">
        <Segment content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis velit non gravida venenatis. Praesent consequat lectus purus, ut scelerisque velit condimentum eu. Maecenas sagittis ante ut turpis varius interdum. Quisque tellus ipsum, eleifend non ipsum id, suscipit ultricies neque." />
      </Flex.Item>
    </Flex.Row>
  </>
)

export default FlexExampleShorthand
