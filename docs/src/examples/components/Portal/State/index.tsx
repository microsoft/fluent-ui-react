import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const PortalStateExamples = () => (
  <ExampleSection title="State">
    <ComponentExample
      title="Open"
      description="A portal can be opened."
      examplePath="components/Portal/State/PortalExampleOpen"
    />
  </ExampleSection>
)

export default PortalStateExamples
