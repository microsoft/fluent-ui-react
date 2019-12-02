import * as React from 'react'

import { PrototypeSection, ComponentPrototype } from '../Prototypes'
import AsyncDropdownSearch from './AsyncDropdownSearch'
import VirtualizedDropdown from './VirtualizedDropdown'

export default () => (
  <PrototypeSection title="Dropdowns">
    <ComponentPrototype
      title="Async Dropdown Search"
      description="Use the field to perform a simulated search."
    >
      <AsyncDropdownSearch />
    </ComponentPrototype>
    <ComponentPrototype
      title="Virtualized Dropdown"
      description="Dropdown with its content virtualized."
    >
      <VirtualizedDropdown />
    </ComponentPrototype>
  </PrototypeSection>
)
