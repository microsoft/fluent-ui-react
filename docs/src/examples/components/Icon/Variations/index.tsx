import React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Space"
      description="An icon can have space before, after or on both sides. 'none' value removes the default space around the icon."
      examplePath="components/Icon/Variations/IconExampleSpace"
    />
    <ComponentExample
      title="Size"
      description="An icon can vary in size."
      examplePath="components/Icon/Variations/IconExampleSize"
    />
    <ComponentExample
      title="Bordered"
      description="An icon can be formatted to appear with rectangular border."
      examplePath="components/Icon/Variations/IconExampleBordered"
    />
    <ComponentExample
      title="Circular"
      description="An icon can be formatted to appear circular."
      examplePath="components/Icon/Variations/IconExampleCircular"
    />
  </ExampleSection>
)

export default Variations
