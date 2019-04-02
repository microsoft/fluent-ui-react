import * as React from 'react'
import { Alert } from '@stardust-ui/react/'

import { LayoutSuggestions } from 'docs/src/components/ComponentDoc/Suggestions'
import Types from './Types'
import Content from './Content'
import Rtl from './Rtl'

const ItemLayoutExamples = () => (
  <div>
    <Alert warning>
      <LayoutSuggestions />
    </Alert>
    <Types />
    <Content />
    <Rtl />
  </div>
)

export default ItemLayoutExamples
