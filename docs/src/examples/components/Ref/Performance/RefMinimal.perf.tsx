import { Ref } from '@fluentui/react'
import * as React from 'react'

export default {
  iterations: 5000,
  filename: 'RefMinimal.perf.tsx',
}

export const RefMinimalPerf = () => (
  <Ref innerRef={React.createRef()}>
    <div />
  </Ref>
)
