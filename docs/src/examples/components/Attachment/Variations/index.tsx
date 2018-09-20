import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Actionable"
      description="An Attachment can be styled to indicate possible user interaction. Hover on the element and try to click on it's different areas to see the effect."
      examplePath="components/Attachment/Variations/AttachmentActionableExample"
    />
  </ExampleSection>
)

export default Variations
