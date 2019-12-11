import { Ref } from '@fluentui/react'
import * as React from 'react'

export default {
  iterations: 1000,
  filename: 'RefBase.perf.tsx',
}

export const RefBasePerf = () => (
  <Ref innerRef={React.createRef()}>
    <div />
  </Ref>
)
