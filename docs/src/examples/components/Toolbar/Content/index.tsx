import { Alert } from '@stardust-ui/react'
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
    <ComponentExample
      title="Toolbar can contain custom content"
      description="Toolbar item can contain custom content."
      examplePath="components/Toolbar/Content/ToolbarExampleCustomContent"
    >
      <Alert warning>
        <p>
          When <code>custom</code> kind is used it is the responsibility of the consumer to verify
          accessibility and styling aspects of the component and handle them correctly. This kind of
          items can't be actionable, but actionable components might be added to the{' '}
          <code>content</code> slot.
        </p>
      </Alert>
    </ComponentExample>
    <ComponentExample
      title="Toolbar overflow menu"
      description="Toolbar can rearrange its items based on its wrapping container width."
      examplePath="components/Toolbar/Content/ToolbarExampleOverflow"
    />
  </ExampleSection>
)

export default Content
