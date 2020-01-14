import { useRangeKnob } from '@fluentui/docs-components'
import { Alert } from '@fluentui/react'
import * as React from 'react'

const AlertExampleWidth = () => {
  const [width] = useRangeKnob({
    name: 'width',
    min: '350px',
    max: '800px',
    initialValue: '500px',
    step: '10px',
  })

  return (
    <div style={{ width }}>
      <Alert
        actions={[{ content: 'Join and add the room', primary: true }]}
        header="There is a conference room close to you."
        dismissible
        icon="screencast"
      />
    </div>
  )
}

export default AlertExampleWidth
