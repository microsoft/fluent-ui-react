import React from 'react'
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample'
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection'

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
    <ComponentExample
      title="Popup button with submenu"
      description="Popup button with submenu"
      examplePath="components/Menu/Types/MenuExampleButton"
    />
  </ExampleSection>
)

export default Types
