import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const PortalTypesExamples = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Basic"
      description="A basic portal."
      examplePath="components/Portal/Types/PortalExample"
    />
    <ComponentExample
      title="Controlled"
      description="A controlled portal."
      examplePath="components/Portal/Types/PortalExampleControlled"
    />
    <ComponentExample
      title="With Focus Trap"
      description="A portal with a focus trap."
      examplePath="components/Portal/Types/PortalExampleFocusTrapped"
    />
  </ExampleSection>
)

export default PortalTypesExamples
