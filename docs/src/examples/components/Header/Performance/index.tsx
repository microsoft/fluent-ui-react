import * as React from 'react'

import ComponentPerfExample from '../../../../components/ComponentDoc/ComponentPerfExample'
import NonPublicSection from '../../../../components/ComponentDoc/NonPublicSection'

const Performance = () => (
  <NonPublicSection title="Performance">
    <ComponentPerfExample
      title="Default"
      description="A default test."
      examplePath="components/Header/Performance/HeaderSlots.perf"
    />
    <ComponentPerfExample
      title="Minimal"
      description="Header with no props."
      examplePath="components/Header/Performance/HeaderMinimal.perf"
    />
  </NonPublicSection>
)

export default Performance
