import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'
import NonPublicSection from 'docs/src/components/ComponentDoc/NonPublicSection'

const Types = () => (
  <>
    <ExampleSection title="Types">
      <ComponentExample
        title="Theme"
        description="A Provider defines the theme for your components."
        examplePath="components/Provider/Types/ProviderExample"
      />
      <ComponentExample
        title="Rtl"
        description="A Provider can specify that the content inside it should be in rtl mode."
        examplePath="components/Provider/Types/ProviderExampleRtl"
      />
      <ComponentExample
        title="Disable animations"
        description="A Provider can specify that the animations inside it's content should be disabled."
        examplePath="components/Provider/Types/ProviderExampleDisableAnimations"
      />
    </ExampleSection>
    <NonPublicSection title="Types for visual tests">
      <ComponentExample examplePath="components/Provider/Types/ProviderExampleScrollbar" />
    </NonPublicSection>
  </>
)

export default Types
