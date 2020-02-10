import { Popup } from '@fluentui/react'
import * as _ from 'lodash'
import * as React from 'react'

const PopupMinimalPerf = () => (
  <>
    {_.times(200, i => (
      <Popup key={i} />
    ))}
  </>
)

PopupMinimalPerf.iterations = 5000
PopupMinimalPerf.filename = 'PopupMinimal.perf.tsx'

export default PopupMinimalPerf
