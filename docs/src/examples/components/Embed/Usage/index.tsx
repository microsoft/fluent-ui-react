import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import UsageSection from 'docs/src/components/ComponentDoc/UsageSection'

const Usage = () => (
  <UsageSection>
    <ComponentExample
      title="YouTube"
      description="An embed component can embed a YouTube video by iframe."
      examplePath="components/Embed/Usage/EmbedExampleYouTube"
    />
  </UsageSection>
)

export default Usage
