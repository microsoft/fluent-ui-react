import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Actionable"
      description="An Attachment can be styled to indicate possible user interaction. Hover on the element and try to click on it's different areas to see the effect. Stardust Icon component is used as a default fill for 'action' slot."
      examplePath="components/Attachment/Variations/AttachmentActionableExample"
    />
    <ComponentExample
      title="DOM element trigger"
      description="Action slot could be customized so that regular HTML button will fill it. Note that 'click' still works as expected."
      examplePath="components/Attachment/Variations/AttachmentActionableWithDomButtonExample"
    />
    <ComponentExample
      title="Third-party component trigger"
      description="Third-party components could be hosted by 'action' slot. Note famous 'ripple' effect of Material UI Button by clicking on it."
      examplePath="components/Attachment/Variations/AttachmentActionableWithImportedComponentExample"
    />
  </ExampleSection>
)

export default Variations
