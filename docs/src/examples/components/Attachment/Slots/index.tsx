import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Slots = () => (
  <ExampleSection title="Slots">
    <ComponentExample
      title="Icon"
      description="An attachment can have an icon."
      examplePath="components/Attachment/Slots/AttachmentIconExample"
    />
    <ComponentExample
      title="Header"
      description="An attachment header informs the user of what is attached."
      examplePath="components/Attachment/Slots/AttachmentHeaderExample"
    />
    <ComponentExample
      title="Description"
      description="The attachment's description gives more detail about the attachment."
      examplePath="components/Attachment/Slots/AttachmentDescriptionExample"
    />
    <ComponentExample
      title="Action"
      description="An attachment can provide the user with an action. Click on the icon to see the effect."
      examplePath="components/Attachment/Slots/AttachmentActionExample"
    />
    <ComponentExample
      title="Progress"
      description="An attachment can show upload progress."
      examplePath="components/Attachment/Slots/AttachmentProgressExample"
    />
  </ExampleSection>
)

export default Slots
