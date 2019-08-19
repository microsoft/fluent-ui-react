import { useBooleanKnob } from '@stardust-ui/docs-components'
import { Alert } from '@stardust-ui/react'
import * as React from 'react'

const AlertExampleDismissible = () => {
  const [visible] = useBooleanKnob({ name: 'visible', initialValue: true })

  return <Alert content="You can always see me." visible={visible} />
}

export default AlertExampleDismissible
