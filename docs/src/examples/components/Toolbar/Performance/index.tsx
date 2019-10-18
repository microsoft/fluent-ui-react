import * as React from 'react'

import ComponentPerfExample from 'docs/src/components/ComponentDoc/ComponentPerfExample'
import NonPublicSection from 'docs/src/components/ComponentDoc/NonPublicSection'

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
