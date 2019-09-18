import { useBooleanKnob, useRangeKnob } from '@stardust-ui/docs-components'
import { Layout } from '@stardust-ui/react'
import * as React from 'react'

const LayoutExampleGap = () => {
  const [gap] = useRangeKnob({ name: 'gap', initialValue: '4rem' })
  const [vertical] = useBooleanKnob({ name: 'vertical' })

  return (
    <Layout debug vertical={vertical} gap={gap as string} start="Start" main="Main" end="End" />
  )
}

export default LayoutExampleGap
