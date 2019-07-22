import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Triggering context menu on different actions"
      description="A context menu can be triggered on click, hover or focus."
      examplePath="components/ContextMenu/Usage/ContextMenuExampleOn"
    />
    <ComponentExample
      title="Triggering context menu on element"
      description="A context menu can be attached to any element."
      examplePath="components/ContextMenu/Usage/ContextMenuExampleOnElement"
    />
    <ComponentExample
      title="Controlled"
      description="Note that if ContextMenu is controlled, then its 'open' prop value could be changed either by parent component, or by user actions (e.g. key press) - thus it is necessary to handle 'onOpenChange' event."
      examplePath="components/ContextMenu/Usage/ContextMenuExampleControlled"
    />
  </ExampleSection>
)

export default Usage
