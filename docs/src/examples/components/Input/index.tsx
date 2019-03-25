import * as React from 'react'

import Rtl from './Rtl'
import Types from './Types'
import Variations from './Variations'
import Variants from './Variants'

/**
 * We would like to render Input with no blue line underneath
 */

// this is a separate question of whether we should register it in theme or somewhere else
// however, it seems that, given that this code controls styling aspects, it should be put to theme

// Should 'variant' be a prop? Most probably, no - as this is not something that should be changed over component's life.

const InputExamples = () => (
  <div>
    <Variants />
    <Types />
    <Variations />
    <Rtl />
  </div>
)

export default InputExamples
