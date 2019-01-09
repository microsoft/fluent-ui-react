import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Multiple Search with Image and Content"
      description="A multiple search dropdown which items have header, content and image."
      examplePath="components/Dropdown/Variations/DropdownExampleMultipleSearchImageAndContent"
    />
    <ComponentExample
      title="Multiple Search Fluid"
      description="A multiple search dropdown that fits the width of the container."
      examplePath="components/Dropdown/Variations/DropdownExampleMultipleSearchFluid"
    />
    <ComponentExample
      title="Multiple Search with Toggle Button"
      description="A multiple search dropdown with toggle button that shows/hides the items list."
      examplePath="components/Dropdown/Variations/DropdownExampleMultipleSearchToggleButton"
    />
  </ExampleSection>
)

export default Variations
