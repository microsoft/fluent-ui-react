import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import NonPublicSection from 'docs/src/components/ComponentDoc/NonPublicSection'

const Performance = () => (
  <NonPublicSection title="Performance">
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
  </NonPublicSection>
)

export default Performance
