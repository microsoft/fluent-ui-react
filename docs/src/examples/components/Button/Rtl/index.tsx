import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import PerformanceSection from 'docs/src/components/ComponentDoc/PerformanceSection'

const Rtl = () => (
  <PerformanceSection title="Rtl">
    <ComponentExample
      title="Default"
      description="A default rtl example."
      examplePath="components/Button/Rtl/ButtonExample.rtl"
    />
  </PerformanceSection>
)

export default Rtl
