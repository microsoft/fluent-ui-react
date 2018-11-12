import * as React from 'react'
import { Segment } from '@stardust-ui/react'

const SegmentExampleInvertedShorthand = () => (
  <div>
    <Segment content="Colored segment." color="purple" />
    <br />
    <Segment inverted content="Colored inverted segment" color="purple" />
  </div>
)

export default SegmentExampleInvertedShorthand
