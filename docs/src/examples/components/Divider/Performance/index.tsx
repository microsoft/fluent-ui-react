import * as React from 'react'

import ComponentPerfExample from 'docs/src/components/ComponentDoc/ComponentPerfExample'
import NonPublicSection from 'docs/src/components/ComponentDoc/NonPublicSection'

const Performance = () => (
  <NonPublicSection title="Performance">
    <ComponentPerfExample
      title="Default"
      description="A default test."
      examplePath="components/Divider/Performance/DividerMinimal.perf"
    />
  </NonPublicSection>
)

export default Performance
