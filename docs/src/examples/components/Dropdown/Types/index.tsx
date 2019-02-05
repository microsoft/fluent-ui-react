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
<<<<<<< HEAD
      title="Search"
      description="A dropdown can be searchable."
      examplePath="components/Dropdown/Types/DropdownExampleSearch"
=======
      title="Multiple Selection"
      description="A dropdown with multiple selection."
      examplePath="components/Dropdown/Types/DropdownExampleMultipleSelection"
    />
    <ComponentExample
      title="Multiple Search"
      description="A dropdown with multiple selection and search."
      examplePath="components/Dropdown/Types/DropdownExampleMultipleSearch"
>>>>>>> feat(dropdown): multiple selection
    />
  </ExampleSection>
)

export default Types
