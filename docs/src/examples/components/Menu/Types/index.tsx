import React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Menu"
      description="A menu."
      examplePath="components/Menu/Types/MenuExample"
    />
    <ComponentExample
      title="Default Primary"
      description="A menu can point to show its relationship to nearby content."
      examplePath="components/Menu/Types/MenuExamplePrimary"
    />
    <ComponentExample
      title="Vertical Menu"
      description="A vertical menu displays elements vertically."
      examplePath="components/Menu/Types/MenuExampleVertical"
    />

    <ComponentExample
      title="Menu with submenu"
      description="Menu with submenu"
      examplePath="components/Menu/Types/MenuExampleWithSubMenu"
    />
  </ExampleSection>
)

export default Types
