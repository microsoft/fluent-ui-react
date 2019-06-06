import * as React from 'react'
import { Segment } from '@stardust-ui/react'

const ProviderExampleShorthand = () => (
  <Segment
    content="Segment with blue border"
    styles={{ border: ['1px solid red', '1px solid blue'] as any }}
  />
)

export default ProviderExampleShorthand
