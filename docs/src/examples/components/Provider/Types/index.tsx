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
    </ExampleSection>
    <NonPublicSection title="Types for visual tests">
      <ComponentExample examplePath="components/Provider/Types/ProviderExampleScrollbar" />
    </NonPublicSection>
  </>
)

export default Types
