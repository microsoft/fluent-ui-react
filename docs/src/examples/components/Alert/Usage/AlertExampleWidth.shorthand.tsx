import { useRangeKnob } from '@stardust-ui/docs-components'
import { Alert } from '@stardust-ui/react'
import * as React from 'react'

const AlertExampleWidth = () => {
  const [width] = useRangeKnob({ name: 'width', initialValue: '500px' })

  return (
    <div style={{ minWidth: 350, maxWidth: 800, width }}>
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
