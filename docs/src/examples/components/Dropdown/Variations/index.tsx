import React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Multiple Search Text Items"
      description="A Dropdown with multi selection and search, items have only text."
      examplePath="components/Dropdown/Variations/DropdownExampleMultipleSearchTextItems.shorthand"
    />
    <ComponentExample
      title="Multiple Search Fluid"
      description="A Fluid Dropdown with multi selection and search."
      examplePath="components/Dropdown/Variations/DropdownExampleMultipleSearchFluid.shorthand"
    />
    <ComponentExample
      title="Multiple Search Placeholder"
      description="A Dropdown with multi selection, search and placeholder."
      examplePath="components/Dropdown/Variations/DropdownExampleMultipleSearchPlaceholder.shorthand"
    />
    <ComponentExample
      title="Multiple Search Toggle Button"
      description="A Dropdown with multi selection, search and toggle button."
      examplePath="components/Dropdown/Variations/DropdownExampleMultipleSearchToggleButton.shorthand"
    />
  </ExampleSection>
)

export default Variations
