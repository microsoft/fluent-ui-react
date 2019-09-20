import * as React from 'react'
import { useRangeKnob } from '@stardust-ui/docs-components'
import { TextArea } from '@stardust-ui/react'

const TextAreaExampleHeight = () => {
  const [height] = useRangeKnob({
    name: 'height',
    initialValue: '120px',
    min: '20px',
    max: '300px',
    step: 10,
  })

  return <TextArea placeholder="Enter message here..." variables={{ height }} />
}

export default TextAreaExampleHeight
