import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A default Attachment."
      examplePath="components/Attachment/Types/AttachmentExample"
    />
    <ComponentExample
      title="Progress"
      description="An attachment can show upload progress."
      examplePath="components/Attachment/Types/AttachmentProgressExample"
    />
  </ExampleSection>
)

export default Types
