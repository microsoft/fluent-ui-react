import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Selection"
      description="A dropdown can be used to select between choices in a form."
      examplePath="components/Dropdown/Types/DropdownExample"
    />
    <ComponentExample
      title="Multiple Selection"
      description="A dropdown can be used to select multiple items from a form."
      examplePath="components/Dropdown/Types/DropdownExampleMultiple"
    />
    <ComponentExample
      title="Search Selection"
      description="A dropdown can be searchable."
      examplePath="components/Dropdown/Types/DropdownExampleSearch"
    />
    <ComponentExample
      title="Search Multiple Selection"
      description="A dropdown can be searchable and allow a multiple selection."
      examplePath="components/Dropdown/Types/DropdownExampleSearchMultiple"
    />
    <ComponentExample
      title="Inline"
      description="A dropdown can be used inline with text."
      examplePath="components/Dropdown/Types/DropdownExampleInline"
    />
  </ExampleSection>
)

export default Types
