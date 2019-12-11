import { Status } from '@fluentui/react'
import * as React from 'react'

const StatusMinimalPerf = () => <Status />

StatusMinimalPerf.iterations = 5000
StatusMinimalPerf.filename = 'StatusMinimal.perf.tsx'

export default StatusMinimalPerf
