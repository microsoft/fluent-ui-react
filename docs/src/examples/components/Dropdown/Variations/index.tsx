import React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Multiple Search Image and Content"
      description="A multiple search dropdown whose items have header, content and image."
      examplePath="components/Dropdown/Variations/DropdownExampleMultipleSearchImageAndContent.shorthand"
    />
    <ComponentExample
      title="Multiple Search Fluid"
      description="A multiple search dropdown that takes the width of container."
      examplePath="components/Dropdown/Variations/DropdownExampleMultipleSearchFluid.shorthand"
    />
    <ComponentExample
      title="Multiple Search Toggle Button"
      description="A multiple search dropdown can have a toggle button."
      examplePath="components/Dropdown/Variations/DropdownExampleMultipleSearchToggleButton.shorthand"
    />
  </ExampleSection>
)

export default Variations
