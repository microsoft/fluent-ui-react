import * as React from 'react'
import * as _ from 'lodash'
import { Segment, ProviderConsumer } from '@stardust-ui/react'

const SegmentExampleColor = () => (
  <ProviderConsumer
    render={({ siteVariables: { emphasisColors, naturalColors } }) =>
      _.keys({ ...emphasisColors, ...naturalColors }).map(color => (
        <Segment key={color} color={color} inverted>
          {_.startCase(color)}
        </Segment>
      ))
    }
  />
)

export default SegmentExampleColor
