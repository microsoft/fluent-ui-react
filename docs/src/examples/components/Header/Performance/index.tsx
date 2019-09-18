import * as React from 'react'

import ComponentPerfExample from 'docs/src/components/ComponentDoc/ComponentPerfExample'
import NonPublicSection from 'docs/src/components/ComponentDoc/NonPublicSection'

const Performance = () => (
  <NonPublicSection title="Performance">
    <ComponentPerfExample
      title="Default"
      description="A default test."
      examplePath="components/Header/Performance/Header.perf"
    />
    <ComponentPerfExample
      title="Default"
      description="A test with a description shorthand."
      examplePath="components/Header/Performance/HeaderDescription.perf"
    />
  </NonPublicSection>
)

export default Performance
