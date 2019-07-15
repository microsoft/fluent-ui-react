import * as React from 'react'
import { Link } from 'react-router-dom'
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
    <ComponentExample
      title="Menu with submenus controlled"
      description="When Submenu in MenuItem is controlled, then its 'menuOpen' prop value could be changed either by parent component, or by user actions (e.g. key press) - thus it is necessary to handle 'onMenuOpenChange' event."
      examplePath="components/Menu/Usages/MenuExampleWithSubmenuControlled"
    />
    <ComponentExample
      title="With tooltips"
      description={
        <>
          {'The items inside the Menu as actionable element should be rendered with '}
          <Link to="/components/tooltip">tooltip</Link>
        </>
      }
      examplePath="components/Menu/Usages/MenuExampleWithTooltip"
    />
  </ExampleSection>
)

export default Usages
