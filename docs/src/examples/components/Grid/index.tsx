import * as React from 'react'
import { Alert } from '@stardust-ui/react'
import { Link } from 'react-router-dom'

import Rtl from './Rtl'
import Types from './Types'
import Variations from './Variations'

const GridExamples = () => (
  <>
    <Alert styles={{ display: 'block' }}>
      <p>
        Get more information on Stardust's approach to layout from{' '}
        <Link to="/layout">Layout guide</Link>.
      </p>
    </Alert>

    <Types />
    <Variations />
    <Rtl />
  </>
)

export default GridExamples
