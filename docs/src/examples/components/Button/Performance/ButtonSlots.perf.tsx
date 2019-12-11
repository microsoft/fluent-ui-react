import { Button } from '@fluentui/react'
import * as React from 'react'

export default {
  iterations: 5000,
  filename: 'ButtonSlots.perf.tsx',
}

export const ButtonSlotsPerf = () => (
  <Button
    icon="play"
    content="Click here"
    loader={{
      delay: 200,
      inline: true,
      label: 'Loading',
      labelPosition: 'end',
      size: 'smallest',
    }}
  />
)
