import * as React from 'react'
import { Link } from 'react-router-dom'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Content = () => (
  <ExampleSection title="Content">
    <ComponentExample
      title="Toolbar can contain a popup"
      description={
        <>
          Toolbar item can open a popup. See <Link to="/components/popup">Popup</Link> component for
          more details.
        </>
      }
      examplePath="components/Toolbar/Content/ToolbarExamplePopup"
    />
    <ComponentExample
      title="Toolbar can contain a menu"
      description="Toolbar item can open a menu."
      examplePath="components/Toolbar/Content/ToolbarExampleMenu"
    />
    <ComponentExample
      title="Toolbar can contain a radio group"
      description="Toolbar items can be grouped into radio group. Up/Down arrow keys can be used to cycle between radio items. Only one of the radio items can be selected at a time, should be implemented additionally."
      examplePath="components/Toolbar/Content/ToolbarExampleRadioGroup"
    />
  </ExampleSection>
)

export default Content
