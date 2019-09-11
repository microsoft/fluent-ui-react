import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import UsageSection from 'docs/src/components/ComponentDoc/UsageSection'

const Usage = () => (
  <UsageSection>
    <ComponentExample
      title="Match Background Example"
      description="The status border for avatar should be set to match whatever background it is on."
      examplePath="components/Avatar/Usage/AvatarUsageExample"
    />
  </UsageSection>
)

export default Usage
