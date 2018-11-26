import React from 'react'
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
      title="Styled Chat Item"
      description="A Chat item with custom styles for every slot."
      examplePath="components/Chat/Types/ChatMessageExampleStyled"
    />
  </ExampleSection>
)

export default Types
