import * as React from 'react'

import ComponentPerfExample from '../../../../components/ComponentDoc/ComponentPerfExample'
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection'

const Performance = () => (
  <ExampleSection title="Performance">
    <ComponentPerfExample
      title="Default"
      description="A test with list items as titles."
      examplePath="components/Tree/Performance/TreeWithListItems.perf"
    />
  </ExampleSection>
)

export default Performance
