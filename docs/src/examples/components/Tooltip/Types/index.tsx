import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A default tooltip."
      examplePath="components/Tooltip/Types/TooltipExample"
    />
    <ComponentExample
      title="Pointing"
      description="A tooltip can have a pointer."
      examplePath="components/Tooltip/Types/TooltipExamplePointing"
    />
    <ComponentExample
      title="Controlled"
      description="Note that if Tooltip is controlled, then its 'open' prop value could be changed either by parent component, or by user actions (e.g. key press) - thus it is necessary to handle 'onOpenChange' event. Try to type some text into tooltip's input field and press ESC to see the effect."
      examplePath="components/Tooltip/Types/TooltipControlledExample"
    />
    <ComponentExample
      title="Content Wrapper"
      description="Use 'content' prop of the Tooltip to set whether Tooltip content should be rendered with the default wrapper."
      examplePath="components/Tooltip/Types/TooltipContentWrapperExample"
    />
    <ComponentExample
      title="Custom Target"
      description="By default Tooltip uses trigger element as the one it is displayed for, but it is possible to provide any DOM element as tooltip's target."
      examplePath="components/Tooltip/Types/TooltipCustomTargetExample"
    />
  </ExampleSection>
)

export default Types
