import { Header } from '@fluentui/react'
import * as React from 'react'

export default {
  iterations: 1000,
  filename: 'HeaderDescription.perf.tsx',
}

export const HeaderDescriptionPerf = () => (
  <Header
    content="Account Settings"
    description="Manage your account settings and set email preferences."
  />
)
