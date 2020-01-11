import * as React from 'react'

import ComponentPerfExample from '../../../../components/ComponentDoc/ComponentPerfExample'
import NonPublicSection from '../../../../components/ComponentDoc/NonPublicSection'

const Performance = () => (
  <NonPublicSection title="Performance">
    <ComponentPerfExample
      title="Custom styled"
      description="Custom styled toolbar"
      examplePath="components/Toolbar/Performance/CustomToolbar.perf"
    />
  </NonPublicSection>
)

export default Performance
