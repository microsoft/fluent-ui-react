import * as React from 'react'
import { Segment, Text } from '@stardust-ui/react'

const SegmentExampleInvertedShorthand = () => (
  <div>
    <Segment color="purple">Colored segment.</Segment>
    <br />
    <Segment inverted color="purple">
      <Text styles={{ color: 'white' }}>Colored inverted segment.</Text>
    </Segment>
  </div>
)

export default SegmentExampleInvertedShorthand
