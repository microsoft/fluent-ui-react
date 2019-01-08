import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Single Selection"
      description="A dropdown with single selection."
      examplePath="components/Dropdown/Types/DropdownExampleSingleSelection"
    />
    <ComponentExample
      title="Multiple Search"
      description="A dropdown with multiple selection and search."
      examplePath="components/Dropdown/Types/DropdownExampleMultipleSearch"
    />
  </ExampleSection>
)

export default Types
