import * as React from 'react'
import { Alert } from '@stardust-ui/react/'

import Types from './Types'
import Variations from './Variations'

const LayoutExamples = () => (
  <div>
    <Alert warning>This component is deprecated</Alert>
    <Types />
    <Variations />
  </div>
)

export default LayoutExamples
