import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Class example"
      description="Class example."
      examplePath="components/Accordion/Types/ClassExample"
    />
    <ComponentExample
      title="Function Component example"
      description="Function Component example."
      examplePath="components/Accordion/Types/FunctionComponentExample"
    />
  </ExampleSection>
)

export default Types
