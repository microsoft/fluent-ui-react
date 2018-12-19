import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Fluid"
      description="A button can take the width of its container."
      examplePath="components/Button/Variations/ButtonExampleFluid"
    />
    <ComponentExample
      title="Circular"
      description="A button can be circular."
      examplePath="components/Button/Variations/ButtonExampleCircular"
    />
    <ComponentExample
      title="Circular Emphasis"
      description="A button can be circular and formatted to show different levels of emphasis."
      examplePath="components/Button/Variations/ButtonExampleEmphasisCircular"
    />
    <ComponentExample
      title="Text"
      description="A button can be shown in form of a text to indicate some less-pronounced actions."
      examplePath="components/Button/Variations/ButtonExampleText"
    />
  </ExampleSection>
)

export default Variations
