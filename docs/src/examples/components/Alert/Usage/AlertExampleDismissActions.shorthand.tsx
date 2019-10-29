import * as React from 'react'
import { Alert } from '@stardust-ui/react'
import { useBooleanKnob } from '@stardust-ui/docs-components'

const AlertExampleDismissActions = () => {
  const [visible, setVisible] = useBooleanKnob({ name: 'visible', initialValue: true })

  return (
    <Alert
      actions={[
        { content: 'Privacy policy', primary: true },
        { content: 'Dismiss', onClick: () => setVisible(false) },
      ]}
      content="Let everyone know that they're being recorded"
      visible={visible}
    />
  )
}

export default AlertExampleDismissActions
