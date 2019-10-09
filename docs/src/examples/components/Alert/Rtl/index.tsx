import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import NonPublicSection from 'docs/src/components/ComponentDoc/NonPublicSection'

const Rtl = () => (
  <NonPublicSection title="Rtl">
    <ComponentExample examplePath="components/Alert/Rtl/AlertExample.rtl" />
    <ComponentExample examplePath="components/Alert/Rtl/AlertExampleChildren.rtl" />
    <ComponentExample examplePath="components/Alert/Rtl/AlertExampleDismissAction.rtl" />
  </NonPublicSection>
)

export default Rtl
