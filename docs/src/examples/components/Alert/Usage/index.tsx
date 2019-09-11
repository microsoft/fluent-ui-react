import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import UsageSection from 'docs/src/components/ComponentDoc/UsageSection'

const Usage = () => (
  <UsageSection>
    <ComponentExample
      title="Dismiss on actions"
      description="You can also dismiss alerts on actions."
      examplePath="components/Alert/Usage/AlertExampleDismissActions"
    />
    <ComponentExample
      title="Important message"
      description="An Alert that displays an important information."
      examplePath="components/Alert/Usage/AlertExampleImportantMessage"
    />
    <ComponentExample
      title="Width"
      description="An Alert can fit container width."
      examplePath="components/Alert/Usage/AlertExampleWidth"
    />
  </UsageSection>
)

export default Usage
