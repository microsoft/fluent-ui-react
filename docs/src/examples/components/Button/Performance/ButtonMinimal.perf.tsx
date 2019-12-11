import { Button } from '@fluentui/react'
import * as React from 'react'

const ButtonMinimalPerf = () => <Button />

ButtonMinimalPerf.iterations = 5000
ButtonMinimalPerf.filename = 'ButtonMinimal.perf.tsx'

export default ButtonMinimalPerf
