import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A dropdown can be used to select between choices in a form."
      examplePath="components/Dropdown/Types/DropdownExample"
    />
    <ComponentExample
      title="Search"
      description="A dropdown can be searchable."
      examplePath="components/Dropdown/Types/DropdownExampleSearch"
    />
  </ExampleSection>
)

export default Types
