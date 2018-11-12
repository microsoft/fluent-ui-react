import * as React from 'react'
import { Segment } from '@stardust-ui/react'

const SegmentExampleInvertedShorthand = () => (
  <div>
    <Segment color="purple">Colored segment.</Segment>
    <br />
    <Segment inverted color="purple">
      Colored inverted segment
    </Segment>
  </div>
)

export default SegmentExampleInvertedShorthand
