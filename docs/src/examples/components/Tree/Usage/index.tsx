import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Usage = () => (
  <ExampleSection title="">
    <ComponentExample
      title="Custom Title"
      description="A Tree with customized title rendering."
      examplePath="components/Tree/Types/TreeTitleCustomizationExample"
    />
    <ComponentExample
      title="Initially Open"
      description="A Tree with some items initially open."
      examplePath="components/Tree/Types/TreeInitiallyOpenExample"
    />
  </ExampleSection>
)

export default Usage
