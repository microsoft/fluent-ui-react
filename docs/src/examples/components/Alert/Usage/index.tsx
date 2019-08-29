import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Usage = () => (
  <ExampleSection title="Usage">
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
  </ExampleSection>
)

export default Usage
