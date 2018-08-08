import React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Icon"
      description="An input can have an icon."
      examplePath="components/Input/Variations/InputExampleIcon"
    />
    <ComponentExample
      title="Fluid"
      description="An input can take the full width of the parent element."
      examplePath="components/Input/Variations/InputExampleFluid"
    />
  </ExampleSection>
)

export default Variations
