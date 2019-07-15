import * as React from 'react'
import { Link } from 'react-router-dom'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="With tooltips"
      description={
        <>
          {'The items inside the Toolbar as actionable element should be rendered with '}
          <Link to="/components/tooltip">tooltip</Link>
        </>
      }
      examplePath="components/Toolbar/Usage/ToolbarExampleWithTooltip"
    />
  </ExampleSection>
)

export default Usage
