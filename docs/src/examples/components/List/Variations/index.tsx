import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'
import NonPublicSection from 'docs/src/components/ComponentDoc/NonPublicSection'

const Variations = () => (
  <>
    <ExampleSection title="Variations">
      <ComponentExample
        title="Truncate"
        description="A list can truncate the header and content of items items."
        examplePath="components/List/Variations/ListExampleTruncate"
      />
    </ExampleSection>
    <NonPublicSection title="Variations for visual tests">
      <ComponentExample examplePath="components/List/Variations/ListExampleFixedTruncate" />
    </NonPublicSection>
  </>
)

export default Variations
