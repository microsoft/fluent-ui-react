import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Theme Icons"
      description="You can access all icon names available in the current theme."
      examplePath="components/Icon/Usage/IconSetExample"
    />
  </ExampleSection>
)

export default Usage
