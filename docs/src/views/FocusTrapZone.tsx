import * as React from 'react'
import { Header } from '@stardust-ui/react'
import DocPage from '../components/DocPage'
import GuidesNavigationFooter from '../components/GuidesNavigationFooter'

export default () => (
  <DocPage title="Focus Trap Zone">
    <Header as="h2">Overview</Header>

    <GuidesNavigationFooter
      previous={{ name: 'Focus Zone', url: 'focus-zone' }}
      next={{ name: 'Auto Focus Zone', url: 'auto-focus-zone' }}
    />
  </DocPage>
)
