import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Dismiss on actions"
      description="You can dismiss alerts also on actions."
      examplePath="components/Alert/Usage/AlertExampleDismissActions"
    />
  </ExampleSection>
)

export default Usage
