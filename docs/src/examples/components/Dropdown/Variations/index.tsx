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
      title="Multiple Search Using French Language"
      description="A multiple search dropdown that uses French to provide information and accessibility."
      examplePath="components/Dropdown/Variations/DropdownExampleMultipleSearchFrenchLanguage"
    />
  </ExampleSection>
)

export default Variations
