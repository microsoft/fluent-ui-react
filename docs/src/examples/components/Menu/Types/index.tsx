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
      title="Primary"
      description="A menu can adjust its appearance to emphasize its contents."
      examplePath="components/Menu/Types/MenuExamplePrimary"
    />
    <ComponentExample
      title="Vertical"
      description="A vertical menu displays elements vertically."
      examplePath="components/Menu/Types/MenuExampleVertical"
    />
    <ComponentExample
      title="Sub Menu"
      description="A menu item may contain another vertical menu nested inside that acts as a grouped sub-menu."
      examplePath="components/Menu/Types/MenuExampleWithSubmenu"
    />
  </ExampleSection>
)

export default Types
