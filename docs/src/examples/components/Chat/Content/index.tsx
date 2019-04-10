import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'
import NonPublicSection from 'docs/src/components/ComponentDoc/NonPublicSection'

const Content = () => (
  <>
    <ExampleSection title="Content">
      <ComponentExample
        title="Actions"
        description="A chat message can contain actions."
        examplePath="components/Chat/Content/ChatExampleActions"
      />
      <ComponentExample
        title="Reaction group"
        description="A chat message can contain group of reactions."
        examplePath="components/Chat/Content/ChatExampleReactionGroup"
      />
    </ExampleSection>
    <NonPublicSection title="Reactions">
      <ComponentExample
        title="Reactions"
        description="A reaction group me reacting, focus and click."
        examplePath="components/Chat/Content/ChatExampleReactionGroupMeReacting"
      />
    </NonPublicSection>
  </>
)

export default Content
