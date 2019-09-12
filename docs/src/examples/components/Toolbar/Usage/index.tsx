import * as React from 'react'
import { Link } from 'react-router-dom'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Usage = () => (
  <ExampleSection title="">
    <ComponentExample
      title="With tooltips"
      description={
        <>
          {'The items inside the Toolbar, as actionable elements, should be rendered with '}
          <Link to="/components/tooltip">tooltip</Link>
        </>
      }
      examplePath="components/Toolbar/Usage/ToolbarExampleWithTooltip"
    />
    <ComponentExample
      title="Popup in Menu"
      description="Menus can contain items that show a Popup"
      examplePath="components/Toolbar/Usage/ToolbarExamplePopupInMenu"
    />
  </ExampleSection>
)

export default Usage
