import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Render callbacks"
      description="A multiple search dropdown which items have header, content and image."
      examplePath="components/Dropdown/Usage/DropdownExampleRender"
    />
  </ExampleSection>
)

export default Variations
