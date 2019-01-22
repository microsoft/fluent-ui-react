import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const State = () => (
  <ExampleSection title="State">
    <ComponentExample
      title="Loading"
      description="A dropdown can show that it is currently loading data."
      examplePath="components/Dropdown/State/DropdownExampleLoading"
    />
  </ExampleSection>
)

export default State
