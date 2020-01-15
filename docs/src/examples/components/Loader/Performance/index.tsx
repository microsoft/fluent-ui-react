import * as React from 'react'

import ComponentPerfExample from 'docs/src/components/ComponentDoc/ComponentPerfExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Performance = () => (
  <ExampleSection title="Performance">
    <ComponentPerfExample
      title="Default"
      description="A default test."
      examplePath="components/Loader/Performance/LoaderMinimal.perf"
    />
  </ExampleSection>
)

export default Performance
