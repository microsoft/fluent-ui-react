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
      title="Vertical &amp; Pointing"
      examplePath="components/Menu/Variations/MenuExampleVerticalPointing"
    />
    <ComponentExample
      title="Color"
      description="A menu can apply different colors."
      examplePath="components/Menu/Variations/MenuExampleColor"
    />
    <ComponentExample
      title="Fluid"
      description="A vertical menu can be fluid which takes up the full space of its container. A horizontal menu does this by default."
      examplePath="components/Menu/Variations/MenuExampleFluid"
    />
  </ExampleSection>
)

export default Variations
