import * as React from 'react'
import { Header } from '@stardust-ui/react'
import DocPage from '../components/DocPage'
import GuidesNavigationFooter from '../components/GuidesNavigationFooter'

export default () => (
  <DocPage title="Auto Focus Zone">
    <Header as="h2">Overview</Header>

    <GuidesNavigationFooter
      previous={{ name: 'Focus Trap Zone', url: 'focus-trap-zone' }}
      next={{ name: 'Theming', url: 'theming' }}
    />
  </DocPage>
)
