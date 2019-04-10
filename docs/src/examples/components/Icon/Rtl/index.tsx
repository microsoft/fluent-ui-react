import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import NonPublicSection from 'docs/src/components/ComponentDoc/NonPublicSection'

const Rtl = () => (
  <NonPublicSection title="Rtl">
    <ComponentExample examplePath="components/Icon/Rtl/IconExample.rtl" />
    <ComponentExample examplePath="components/Icon/Rtl/IconExampleRotate.rtl" />
  </NonPublicSection>
)

export default Rtl
