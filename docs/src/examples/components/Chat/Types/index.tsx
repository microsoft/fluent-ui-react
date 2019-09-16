import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A default Chat."
      examplePath="components/Chat/Types/ChatExample"
    />
    <ComponentExample
      title="Content position"
      description="A ChatItem can position it's content at the start or at the end of the container."
      examplePath="components/Chat/Types/ChatExampleContentPosition"
    />
    <ComponentExample
      title="Badge"
      description="A Chat message may contained badge positioned at the start or end of the message."
      examplePath="components/Chat/Types/ChatMessageExampleBadge"
    />
  </ExampleSection>
)

export default Types
