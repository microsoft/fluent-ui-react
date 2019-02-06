import * as React from 'react'
import { Flex, Segment } from '@stardust-ui/react'

const FlexExampleShorthand = () => (
  <>
    <Flex gap="10px" hAlign="center" vAlign="center" debug>
      <Flex.Item align="start" size="150px">
        <Segment content="This cell should be top aligned." />
      </Flex.Item>

      <Flex.Item align="stretch" size="150px">
        <Segment content="Curabitur pulvinar dolor lectus, quis porta turpis ullamcorper nec. Quisque eget varius turpis, quis iaculis nibh. Ut interdum ligula id metus hendrerit cursus. Integer eu leo felis. Aenean commodo ultrices nunc, sit amet blandit elit gravida in. Sed est ligula, ornare ac nisi adipiscing, iaculis facilisis tellus." />
      </Flex.Item>

      <Flex.Item align="center" size="150px">
        <Segment content="This cell should be center-aligned." />
      </Flex.Item>

      <Flex.Item align="end" size="150px">
        <Segment content="This cell should be bottom-aligned." />
      </Flex.Item>
    </Flex>
  </>
)

export default FlexExampleShorthand
