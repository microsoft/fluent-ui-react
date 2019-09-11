import * as React from 'react'
import { Link } from 'react-router-dom'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import UsageSection from 'docs/src/components/ComponentDoc/UsageSection'

const Usage = () => (
  <UsageSection>
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
  </UsageSection>
)

export default Usage
