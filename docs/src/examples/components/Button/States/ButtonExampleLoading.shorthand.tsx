import * as React from 'react'
import { Button } from '@stardust-ui/react'
import { useBooleanKnob } from '@stardust-ui/docs-components'

const ButtonExampleLoading = () => {
  const [loading] = useBooleanKnob({ name: 'loading', initialValue: true })

  return <Button loading={loading} content={loading ? 'Processing' : 'Success'} />
}

export default ButtonExampleLoading
