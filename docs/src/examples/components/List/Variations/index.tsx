import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Truncate"
      description="A list can truncate the header and content of items items."
      examplePath="components/List/Variations/ListExampleTruncate"
    />
    <ComponentExample
      title="Actionable"
      description="A list which has actionable elements inside. In this variant list item has role=button"
      examplePath="components/List/Variations/ListExampleActionable"
    />
  </ExampleSection>
)

export default Variations
