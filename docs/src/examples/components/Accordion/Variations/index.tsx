import React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Complex content"
      description="An Accordion can compose complex children."
      examplePath="components/Accordion/Variations/AccordionExampleList"
    />
    <ComponentExample
      title="Nested content"
      description="An Accordion can have nested Accordians."
      examplePath="components/Accordion/Variations/AccordionNestedExample"
    />
  </ExampleSection>
)

export default Variations
