import * as React from 'react'

import ComponentPerfExample from 'docs/src/components/ComponentDoc/ComponentPerfExample'
import NonPublicSection from 'docs/src/components/ComponentDoc/NonPublicSection'

const Performance = () => (
  <NonPublicSection title="Performance">
    <ComponentPerfExample
      title="Common"
      description="A typical list with common slots filled."
      examplePath="components/List/Performance/ListCommon.perf"
    />
  </NonPublicSection>
)

export default Performance
