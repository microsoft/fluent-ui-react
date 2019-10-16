import * as React from 'react'

import ComponentPerfExample from 'docs/src/components/ComponentDoc/ComponentPerfExample'
import NonPublicSection from 'docs/src/components/ComponentDoc/NonPublicSection'

const Performance = () => (
  <NonPublicSection title="Performance">
    <ComponentPerfExample
      title="Merge themes"
      description="mergeThemes perf"
      examplePath="components/Provider/Performance/ProviderMergeThemes.perf"
    />
  </NonPublicSection>
)

export default Performance
