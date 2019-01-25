import * as React from 'react'
import { Flex, Segment } from '@stardust-ui/react'

const FlexExampleShorthand = () => (
  <>
    <Flex.Row gap="10px" center debug>
      <Flex.Item align="start">
        <Segment content="This cell should be top aligned." style={{ maxWidth: '150px' }} />
      </Flex.Item>

      <Segment
        content="Curabitur pulvinar dolor lectus, quis porta turpis ullamcorper nec. Quisque eget varius turpis, quis iaculis nibh. Ut interdum ligula id metus hendrerit cursus. Integer eu leo felis. Aenean commodo ultrices nunc, sit amet blandit elit gravida in. Sed est ligula, ornare ac nisi adipiscing, iaculis facilisis tellus."
        style={{ maxWidth: '150px' }}
      />

      <Flex.Item align="center">
        <Segment content="This cell should be center-aligned." style={{ maxWidth: '150px' }} />
      </Flex.Item>

      <Flex.Item align="end">
        <Segment content="This cell should be bottom-aligned." style={{ maxWidth: '150px' }} />
      </Flex.Item>
    </Flex.Row>
  </>
)

export default FlexExampleShorthand
