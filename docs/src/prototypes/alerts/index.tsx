import * as React from 'react'
import { PrototypeSection, ComponentPrototype } from '../Prototypes'
import BannerAlerts from './BannerAlerts'

export default () => (
  <PrototypeSection title="Alerts">
    <ComponentPrototype
      title="Types of alerts"
      description="The Alert component can be customized to show other intents than the ones defined (using variables)."
    >
      <BannerAlerts />
    </ComponentPrototype>
  </PrototypeSection>
)
