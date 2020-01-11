import * as React from 'react'

import ComponentPerfExample from '../../../../components/ComponentDoc/ComponentPerfExample'
import NonPublicSection from '../../../../components/ComponentDoc/NonPublicSection'

const Performance = () => (
  <NonPublicSection title="Performance">
    <ComponentPerfExample
      title="Default"
      description="A default test."
      examplePath="components/Loader/Performance/LoaderMinimal.perf"
    />
  </NonPublicSection>
)

export default Performance
