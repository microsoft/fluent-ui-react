import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Performance = () => (
  <ExampleSection title="Performance">
    <ComponentExample
      title="Default"
      description="A default button."
      examplePath="components/Button/Types/ButtonExample"
    />
  </ExampleSection>
)

export default Performance
