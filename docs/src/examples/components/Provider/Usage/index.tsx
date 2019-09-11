import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import UsageSection from 'docs/src/components/ComponentDoc/UsageSection'

const Usage = () => (
  <UsageSection>
    <ComponentExample
      title="Target"
      description="A Provider allows to define target document to apply styles."
      examplePath="components/Provider/Usage/ProviderExampleTarget"
    />
  </UsageSection>
)

export default Usage
