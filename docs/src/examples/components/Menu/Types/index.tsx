import * as React from 'react'
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
      title="Menu with submenus"
      description="A menu can have submenus."
      examplePath="components/Menu/Types/MenuExampleWithSubmenu"
    />
    <ComponentExample examplePath="components/Menu/Types/MenuExampleVerticalWithSubmenu" />
  </ExampleSection>
)

export default Types
