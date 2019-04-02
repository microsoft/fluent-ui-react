import * as React from 'react'
import { Alert } from '@stardust-ui/react/'

import Types from './Types'
import Content from './Content'
import Rtl from './Rtl'

const ItemLayoutExamples = () => (
  <div>
    <Alert warning>This component is deprecated</Alert>
    <Types />
    <Content />
    <Rtl />
  </div>
)

export default ItemLayoutExamples
