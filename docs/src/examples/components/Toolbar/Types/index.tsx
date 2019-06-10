import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Toolbar can contain a popup"
      description="Toolbar item can open a popup. See `Popup` component for more details."
      examplePath="components/Toolbar/Types/ToolbarExamplePopup"
    />
    <ComponentExample
      title="Text editor toolbar"
      description="A Toolbar use case for a text editor."
      examplePath="components/Toolbar/Types/ToolbarExampleEditor"
    />
  </ExampleSection>
)

export default Types
