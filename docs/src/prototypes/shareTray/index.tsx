import * as React from 'react'
import { KnobProvider } from '@stardust-ui/docs-components'
import Selectors from './Selectors'

export default () => (
  <KnobProvider>
    <Selectors />
  </KnobProvider>
)
