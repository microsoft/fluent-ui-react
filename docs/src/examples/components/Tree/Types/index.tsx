import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A default Tree."
      examplePath="components/Tree/Types/TreeExample"
    />
    <ComponentExample
      title="Exclusive"
      description="A Tree with components as title."
      examplePath="components/Tree/Types/TreeExclusiveExample"
    />
  </ExampleSection>
)

export default Types
