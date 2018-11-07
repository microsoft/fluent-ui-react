import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Multiple Search"
      description="A Dropdown with multi selection and search."
      examplePath="components/Dropdown/Types/DropdownExampleMultipleSearch.shorthand"
    />
    <ComponentExample
      title="Multiple Search Fluid"
      description="A Fluid Dropdown with multi selection and search."
      examplePath="components/Dropdown/Types/DropdownExampleMultipleSearchFluid.shorthand"
    />
    <ComponentExample
      title="Multiple Search Placeholder"
      description="A Dropdown with multi selection, search and placeholder."
      examplePath="components/Dropdown/Types/DropdownExampleMultipleSearchPlaceholder.shorthand"
    />
    <ComponentExample
      title="Multiple Search Toggle Button"
      description="A Dropdown with multi selection, search and toggle button."
      examplePath="components/Dropdown/Types/DropdownExampleMultipleSearchToggleButton.shorthand"
    />
  </ExampleSection>
)

export default Types
