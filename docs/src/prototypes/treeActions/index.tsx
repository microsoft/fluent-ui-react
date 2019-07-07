import * as React from 'react'
import { PrototypeSection, ComponentPrototype } from '../Prototypes'
import TreeActions from './TreeActions'

export default () => (
  <PrototypeSection title="Alerts">
    <ComponentPrototype title="Tree actions" description="Tree actions">
      <TreeActions />
    </ComponentPrototype>
  </PrototypeSection>
)
