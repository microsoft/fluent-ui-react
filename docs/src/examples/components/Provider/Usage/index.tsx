import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Target"
      description="A Provider allows to define target document to apply styles."
      examplePath="components/Provider/Usage/ProviderExampleTarget"
    />
  </ExampleSection>
)

export default Usage
