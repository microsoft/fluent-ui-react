import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import NonPublicSection from 'docs/src/components/ComponentDoc/NonPublicSection'

const Perf = () => (
  <NonPublicSection title="Rtl">
    <ComponentExample examplePath="components/Slider/Perf/SliderExample.perf" />
  </NonPublicSection>
)

export default Perf
