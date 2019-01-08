import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Different kinds of elements"
      description="A menu can create different elements inside (items, separators) using the kind property."
      examplePath="components/Menu/Usage/MenuExampleKind"
    />
  </ExampleSection>
)

export default Usage
