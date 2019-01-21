import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Render callbacks"
      description="You can customize rendered elements with render callbacks."
      examplePath="components/Dropdown/Usage/DropdownExampleRender"
    />
  </ExampleSection>
)

export default Variations
