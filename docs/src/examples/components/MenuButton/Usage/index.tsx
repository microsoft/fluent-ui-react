import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import UsageSection from 'docs/src/components/ComponentDoc/UsageSection'

const Usage = () => (
  <UsageSection>
    <ComponentExample
      title="Triggering menu on different actions"
      description="A context menu can be triggered on click, hover, focus or context."
      examplePath="components/MenuButton/Usage/MenuButtonExampleOn"
    />
    <ComponentExample
      title="Context menu"
      description="A menu button can be attached to any element to create a context menu."
      examplePath="components/MenuButton/Usage/MenuButtonExampleContextMenu"
    />
  </UsageSection>
)

export default Usage
