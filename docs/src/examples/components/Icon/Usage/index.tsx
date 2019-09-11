import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import UsageSection from 'docs/src/components/ComponentDoc/UsageSection'

const Usage = () => (
  <UsageSection>
    <ComponentExample
      title="Theme Icons"
      description="You can access all icon names available in the current theme."
      examplePath="components/Icon/Usage/IconSetExample"
    />
  </UsageSection>
)

export default Usage
