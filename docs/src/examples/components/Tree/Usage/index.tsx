import * as React from 'react'

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample'
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection'

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Custom Title"
      description="A Tree with customized title rendering."
      examplePath="components/Tree/Usage/TreeTitleCustomizationExample"
    />
    <ComponentExample
      title="Initially Open"
      description="A Tree with some items initially open."
      examplePath="components/Tree/Usage/TreeInitiallyOpenExample"
    />
    <ComponentExample
      title="As a List"
      description="A Tree with list accessibility roles."
      examplePath="components/Tree/Usage/TreeAsListExample"
    />
  </ExampleSection>
)

export default Usage
