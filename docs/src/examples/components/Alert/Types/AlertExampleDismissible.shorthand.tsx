import { useBooleanKnob } from '@stardust-ui/docs-components'
import { Alert } from '@stardust-ui/react'
import * as React from 'react'

const AlertExampleDismissible = () => {
  const [visible, setVisible] = useBooleanKnob({ name: 'visible', initialValue: true })

  return (
    <Alert
      content="This is a special notification which you can dismiss if you're bored with it."
      dismissible
      onDismiss={() => setVisible(false)}
      visible={visible}
    />
  )
}

export default AlertExampleDismissible
