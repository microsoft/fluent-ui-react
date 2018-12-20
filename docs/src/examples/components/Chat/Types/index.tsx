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
      title="Gutter"
      description="A Chat can have a gutter positioned at the start or at the end of a message."
      examplePath="components/Chat/Types/ChatExampleGutterPosition"
    />
    <ComponentExample
      title="Styled Chat Item"
      description="A Chat item with custom styles for every slot."
      examplePath="components/Chat/Types/ChatMessageExampleStyled"
    />
  </ExampleSection>
)

export default Types
