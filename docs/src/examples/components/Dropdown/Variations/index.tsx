import React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Multiple Search Image and Content"
      description="A Dropdown with multi selection and search, items have header, content and image."
      examplePath="components/Dropdown/Variations/DropdownExampleMultipleSearchImageAndContent.shorthand"
    />
    <ComponentExample
      title="Multiple Search Fluid"
      description="A Fluid Dropdown with multi selection and search."
      examplePath="components/Dropdown/Variations/DropdownExampleMultipleSearchFluid.shorthand"
    />
    <ComponentExample
      title="Multiple Search Toggle Button"
      description="A Dropdown with multi selection, search and toggle button."
      examplePath="components/Dropdown/Variations/DropdownExampleMultipleSearchToggleButton.shorthand"
    />
  </ExampleSection>
)

export default Variations
