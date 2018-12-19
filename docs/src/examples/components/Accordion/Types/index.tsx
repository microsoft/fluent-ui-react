import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A default Accordion."
      examplePath="components/Accordion/Types/AccordionExample"
    />
    <ComponentExample
      title="Exclusive"
      description="An exclusive Accordion."
      examplePath="components/Accordion/Types/AccordionExclusiveExample"
    />
  </ExampleSection>
)

export default Types
