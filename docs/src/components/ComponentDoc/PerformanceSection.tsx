import * as React from 'react'
import ExampleSection, { ExampleSectionProps } from './ExampleSection'

const PerformanceSection: React.FC<ExampleSectionProps> = props => {
  return process.env.NODE_ENV === 'development' ? <ExampleSection {...props} /> : null
}

export default PerformanceSection
