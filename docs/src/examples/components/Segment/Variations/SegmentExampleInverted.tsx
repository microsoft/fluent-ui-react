import * as React from 'react'
import { Segment } from '@stardust-ui/react'

const SegmentExampleInvertedShorthand = () => (
  <div>
    <Segment color="red">Colored segment.</Segment>
    <br />
    <Segment inverted color="red">
      Colored inverted segment.
    </Segment>
  </div>
)

export default SegmentExampleInvertedShorthand
