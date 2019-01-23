import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import PerformanceSection from 'docs/src/components/ComponentDoc/PerformanceSection'

const Performance = () => (
  <PerformanceSection title="Performance">
    <ComponentExample
      title="Default"
      description="A default test."
      examplePath="components/Attachment/Performance/Attachment.perf"
    />
  </PerformanceSection>
)

export default Performance
