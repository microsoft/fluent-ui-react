import * as React from 'react'
import { PrototypeSection, ComponentPrototype } from '../Prototypes'
import Badge from './Badge'

export default () => (
  <PrototypeSection title="Alerts">
    <ComponentPrototype
      title="Banner Alerts"
      description={
        <span>
          The <code>Label</code> component can be customized to appear as a badge.
        </span>
      }
    >
      <Badge />
    </ComponentPrototype>
  </PrototypeSection>
)
