import React from 'react'

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
      title="Portal focus trap"
      description="Portal focus trap"
      examplePath="components/Portal/Types/PortalFocusTrapExample"
    />
    <ComponentExample
      title="Portal with embeded Portal inside"
      description="Portal with embeded Portal inside"
      examplePath="components/Portal/Types/PortalInPortalExample"
    />

    <ComponentExample
      title="Portal that opens with timeout"
      description="Portal that opens with timeout"
      examplePath="components/Portal/Types/PortalWithTimeout"
    />
  </ExampleSection>
)

export default PortalTypesExamples
