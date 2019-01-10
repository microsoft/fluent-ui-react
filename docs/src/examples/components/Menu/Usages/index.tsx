import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Usages = () => (
  <ExampleSection title="Usages">
    <ComponentExample
      title="Menu as a Toolbar"
      description="A menu with Toolbar accessibility behavior."
      examplePath="components/Menu/Usages/MenuExampleToolbar"
    />
    <ComponentExample
      title="Menu as a Tab List"
      description="A menu with TabList accessibility behavior."
      examplePath="components/Menu/Usages/MenuExampleTabList"
    />
    <ComponentExample
      title="Menu with submenus"
      description="A menu can have submenus."
      examplePath="components/Menu/Usages/MenuExampleWithSubmenu"
    />
  </ExampleSection>
)

export default Usages
