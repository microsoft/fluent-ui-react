import { Accordion } from '@fluentui/react'
import * as React from 'react'

const AccordionMinimalPerf = () => <Accordion />

AccordionMinimalPerf.iterations = 5000
AccordionMinimalPerf.filename = 'AccordionMinimal.perf.tsx'

export default AccordionMinimalPerf
