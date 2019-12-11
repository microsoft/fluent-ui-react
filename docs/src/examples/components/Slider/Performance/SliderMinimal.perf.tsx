import { Slider } from '@fluentui/react'
import * as React from 'react'

const SliderMinimalPerf = () => <Slider />

SliderMinimalPerf.iterations = 5000
SliderMinimalPerf.filename = 'SliderMinimal.perf.tsx'

export default SliderMinimalPerf
