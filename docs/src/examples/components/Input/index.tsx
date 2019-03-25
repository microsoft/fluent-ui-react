import * as React from 'react'

import Rtl from './Rtl'
import Types from './Types'
import Variations from './Variations'
import Variants from './Variants'

/**
 * --------------------
 * SCENARIOS TO ADDRESS
 * --------------------
 * - introduce component variants that override
 *    - variable values
 *    - styles
 * - icon fill on hover
 *    - there is an icon, there is a prop that controles whether it is outlined or filled
 *    - we need to change this prop's value on parent button's hover
 *      - essentially, it applies the following info being provided by theme: when button is hovered, set X props for child icon
 * -------------------
 */

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
