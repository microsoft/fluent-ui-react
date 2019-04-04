import * as React from 'react'
import { Alert } from '@stardust-ui/react/'

import { LayoutSuggestions } from 'docs/src/components/ComponentDoc/Suggestions'
import Types from './Types'
import Variations from './Variations'

const LayoutExamples = () => (
  <div>
    <Alert warning>
      <LayoutSuggestions />
    </Alert>
    <Types />
    <Variations />
  </div>
)

export default LayoutExamples
