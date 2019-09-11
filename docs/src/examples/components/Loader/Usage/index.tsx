import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import UsageSection from 'docs/src/components/ComponentDoc/UsageSection'

const LoaderUsageExamples = () => (
  <UsageSection>
    <ComponentExample
      title="Delay"
      description="Time in milliseconds after component mount before spinner is visible."
      examplePath="components/Loader/Usage/LoaderExampleDelay"
    />
  </UsageSection>
)

export default LoaderUsageExamples
