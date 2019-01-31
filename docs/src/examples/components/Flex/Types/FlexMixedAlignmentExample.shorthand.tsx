import * as React from 'react'
import { Flex as Row, Segment } from '@stardust-ui/react'

const FlexExampleShorthand = () => (
  <>
    <Row gap="10px" hAlign="center" vAlign="center" debug>
      <Row.Item align="start">
        <Segment content="This cell should be top aligned." style={{ maxWidth: '150px' }} />
      </Row.Item>

      <Segment
        content="Curabitur pulvinar dolor lectus, quis porta turpis ullamcorper nec. Quisque eget varius turpis, quis iaculis nibh. Ut interdum ligula id metus hendrerit cursus. Integer eu leo felis. Aenean commodo ultrices nunc, sit amet blandit elit gravida in. Sed est ligula, ornare ac nisi adipiscing, iaculis facilisis tellus."
        style={{ maxWidth: '150px' }}
      />

      <Row.Item align="center">
        <Segment content="This cell should be center-aligned." style={{ maxWidth: '150px' }} />
      </Row.Item>

      <Row.Item align="end">
        <Segment content="This cell should be bottom-aligned." style={{ maxWidth: '150px' }} />
      </Row.Item>
    </Row>
  </>
)

export default FlexExampleShorthand
