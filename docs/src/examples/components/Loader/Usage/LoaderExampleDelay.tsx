import { Loader } from '@stardust-ui/react'
import * as React from 'react'
import { useBooleanKnob, useRangeKnob } from '@stardust-ui/docs-components'

const LoaderExampleDelay = () => {
  const [mounted] = useBooleanKnob({ name: 'mounted', initialValue: true })
  const [delay] = useRangeKnob({ name: 'delay', initialValue: 500 })

  return <div style={{ minHeight: 24 }}>{mounted && <Loader delay={delay as number} />}</div>
}
export default LoaderExampleDelay
