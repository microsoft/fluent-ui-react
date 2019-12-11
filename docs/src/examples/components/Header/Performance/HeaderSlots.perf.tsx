import { Header } from '@fluentui/react'
import * as React from 'react'

export default {
  iterations: 5000,
  filename: 'HeaderSlots.perf.tsx',
}

export const HeaderSlotsPerf = () => (
  <Header
    content="Account Settings"
    description="Manage your account settings and set email preferences."
  />
)
