import * as React from 'react'
import { Link } from 'react-router-dom'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Toolbar can contain a popup"
      description={
        <>
          Toolbar item can open a popup. See <Link to="/components/popup">Popup</Link> component for
          more details.
        </>
      }
      examplePath="components/Toolbar/Types/ToolbarExamplePopup"
    />
    <ComponentExample
      title="Toolbar can contain a radio group"
      description="Toolbar items can be grouped into radio group. Up/Down arrow keys can be used to cycle between radio items. Only one of the radio items can be selected at a time, should be implemented additionally."
      examplePath="components/Toolbar/Types/ToolbarExampleRadioGroup"
    />
    <ComponentExample
      title="Text editor toolbar"
      description="A Toolbar use case for a text editor."
      examplePath="components/Toolbar/Types/ToolbarExampleEditor"
    />
  </ExampleSection>
)

export default Types
