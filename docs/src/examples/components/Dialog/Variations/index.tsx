import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const DialogVariationsExamples = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Modal"
      description="Whether content outside should be inert, e.g. when focusing/clicking outside is not possible and the dialog will have a visible overlay."
      examplePath="components/Dialog/Variations/DialogExampleModal"
    />
  </ExampleSection>
)

export default DialogVariationsExamples
