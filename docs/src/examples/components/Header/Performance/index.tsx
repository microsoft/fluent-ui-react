import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import PerformanceSection from 'docs/src/components/ComponentDoc/PerformanceSection'

const Performance = () => (
  <PerformanceSection title="Performance">
    <ComponentExample
      title="Default"
      description="A default test."
      examplePath="components/Header/Performance/Header.perf"
    />
    <ComponentExample
      title="Default"
      description="A test with a description shorthand."
      examplePath="components/Header/Performance/HeaderDescription.perf"
    />
  </PerformanceSection>
)

export default Performance
