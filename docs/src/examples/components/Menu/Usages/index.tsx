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
      title="Vertical menu with icon &amp; text"
      description="A menu with accessibility behavior. This type of menu is commonly used as a popup submenu."
      examplePath="components/Menu/Usages/MenuExampleVerticalWithIcons"
    />
    <ComponentExample
      title="Menu as a toolbar that has a popup submenu"
      description="A menu can have submenus...."
      examplePath="components/Menu/Usages/MenuExampleToolbarWithPopupMenu"
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
