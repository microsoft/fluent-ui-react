import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import UsageSection from 'docs/src/components/ComponentDoc/UsageSection'

const Usage = () => (
  <UsageSection>
    <ComponentExample
      title="Controlled"
      description="A dropdown can handle open state in controlled mode."
      examplePath="components/Dropdown/Usage/DropdownExampleControlled"
    />
    <ComponentExample
      title="Render callbacks"
      description="You can customize rendered elements with render callbacks."
      examplePath="components/Dropdown/Usage/DropdownExampleRender"
    />
  </UsageSection>
)

export default Usage
