import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Vertical"
      description="A vertical menu displays elements vertically."
      examplePath="components/Menu/Variations/MenuExampleVertical"
    />
    <ComponentExample
      title="Primary"
      description="A menu can have a primary color."
      examplePath="components/Menu/Variations/MenuExamplePrimary"
    />
    <ComponentExample
      title="Fluid"
      description="A vertical menu can be fluid which takes up the full space of its container. A horizontal menu does this by default."
      examplePath="components/Menu/Variations/MenuExampleFluid"
    />
  </ExampleSection>
)

export default Variations
