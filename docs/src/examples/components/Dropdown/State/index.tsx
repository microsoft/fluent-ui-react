import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const State = () => (
  <ExampleSection title="State">
    <ComponentExample
      title="Loading"
      description="A dropdown with single selection."
      examplePath="components/Dropdown/State/DropdownExampleLoading"
    />
  </ExampleSection>
)

export default State
