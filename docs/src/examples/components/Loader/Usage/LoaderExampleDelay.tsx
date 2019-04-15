import { Loader } from '@stardust-ui/react'
import * as React from 'react'
import { useBooleanKnob } from '@stardust-ui/docs-components'

const LoaderExampleDelay = () => {
  const [mounted] = useBooleanKnob({ name: 'mounted', initialValue: true })

  return <div style={{ minHeight: 24 }}>{mounted && <Loader delay={500} />}</div>
}
export default LoaderExampleDelay
