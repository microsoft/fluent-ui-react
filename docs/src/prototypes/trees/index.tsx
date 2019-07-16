import * as React from 'react'

import { PrototypeSection, ComponentPrototype } from '../Prototypes'
import VirtualizedTree from './VirtualizedTree'

export default () => (
  <PrototypeSection title="Trees">
    <ComponentPrototype
      title="Virtualized Tree"
      description="Expand the tree and scroll through it."
    >
      <VirtualizedTree />
    </ComponentPrototype>
  </PrototypeSection>
)
