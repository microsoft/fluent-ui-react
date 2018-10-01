import React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A default popup."
      examplePath="components/Popup/Types/PopupExample"
    />
    <ComponentExample
      title="Emoji grid popup"
      description="Emoji grid popup"
      examplePath="components/Popup/Types/EmojiPopupExample"
    />
    <ComponentExample
      title="Sticker popup"
      description="Sticker popup"
      examplePath="components/Popup/Types/StickerPopupExample"
    />
    <ComponentExample
      title="Prototype popup"
      description="Prototype popup"
      examplePath="components/Popup/Types/Prototype"
    />
  </ExampleSection>
)

export default Types
