import React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Fluid"
      description="An image can take up the width of its container."
      examplePath="components/Image/Variations/ImageExampleFluid"
    />
    <ComponentExample
      title="Circular"
      description="An image may appear circular."
      examplePath="components/Image/Variations/ImageExampleCircular"
    />
  </ExampleSection>
)

export default Variations
