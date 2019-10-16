import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const DialogContentExamples = () => (
  <ExampleSection title="Content">
    <ComponentExample
      title="Content"
      description="A dialog can contain a content."
      examplePath="components/Dialog/Content/DialogExampleContent"
    />
    <ComponentExample
      title="Header action"
      description="A dialog can contain an action in the header."
      examplePath="components/Dialog/Content/DialogExampleHeaderAction"
    />
    <ComponentExample
      title="Footer"
      description="A dialog can contain a footer."
      examplePath="components/Dialog/Content/DialogExampleFooter"
    />
  </ExampleSection>
)

export default DialogContentExamples
