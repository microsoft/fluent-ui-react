import React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Items = () => (
  <ExampleSection title="Items">
    <ComponentExample
      title="Bubble"
      description="The items inside the chat can be a message bubbles."
      examplePath="components/Chat/Items/ChatItemBubbleExample"
    />
    <ComponentExample
      title="Action"
      description="The items inside the chat can be an action taken by some chat members."
      examplePath="components/Chat/Items/ChatItemActionExample"
    />
    <ComponentExample
      title="Divider"
      description="The items inside the chat can contain dividers for logically dividing the messages inside the chat."
      examplePath="components/Chat/Items/ChatItemDividerExample"
    />
  </ExampleSection>
)

export default Items
