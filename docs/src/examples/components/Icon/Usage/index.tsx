import React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Theme Icons"
      description="You can access all icon names available in the current theme."
      examplePath="components/Icon/Usage/IconSetExample"
    />
    <ComponentExample
      title="Aligned icons"
      description="You can vertically line up icons of the same size."
      examplePath="components/Icon/Usage/IconAlignedExample"
    />
  </ExampleSection>
)

export default Usage
