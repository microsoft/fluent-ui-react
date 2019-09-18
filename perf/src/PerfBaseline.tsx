import * as React from 'react'
import * as _ from 'lodash'

const PerfBaseline = () => (
  <>
    {_.times(1000, i => (
      <div key={i}>perf baseline {i}</div>
    ))}
  </>
)

export default PerfBaseline
