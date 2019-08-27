import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const DialogVariationsExamples = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Backdrop"
      description="A dialog can have a backdrop on its overlay."
      examplePath="components/Dialog/Variations/DialogExampleBackdrop"
    />
    <ComponentExample
      title="Inert"
      description="Whether the dialog should be inert, e.g. not dismiss when focusing/clicking outside of the dialog. Hides an overlay."
      examplePath="components/Dialog/Variations/DialogExampleInert"
    />
  </ExampleSection>
)

export default DialogVariationsExamples
