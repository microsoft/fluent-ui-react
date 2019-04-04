import * as React from 'react'
import { Layout } from '@stardust-ui/react'

const LayoutExampleGap = ({ knobs }) => (
  <Layout debug vertical={knobs.vertical} gap={knobs.gap} start="Start" main="Main" end="End" />
)

export default LayoutExampleGap
