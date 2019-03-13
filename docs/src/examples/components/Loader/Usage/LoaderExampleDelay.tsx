import { Loader } from '@stardust-ui/react'
import * as React from 'react'

const LoaderExampleDelay: React.FC<{ knobs: { mounted: boolean } }> = ({ knobs }) => (
  <div style={{ minHeight: 24 }}>{knobs.mounted && <Loader delay={500} />}</div>
)

export default LoaderExampleDelay
