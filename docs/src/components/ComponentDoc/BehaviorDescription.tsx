import * as React from 'react'
import { Loader } from '@stardust-ui/react/src'

const AccessibilityDescription = React.lazy(() => import('./AccessibilityDescription'))

const item = '- '

const BehaviorDescription: React.FunctionComponent<{ value: string }> = ({ value }) => {
  const markdown =
    item +
    value
      .split('\n')
      .join(`\n${item}`)
      .replace(/'(?!s )/g, '\u0060')
  return (
    <React.Suspense fallback={<Loader />}>
      <AccessibilityDescription value={markdown} />
    </React.Suspense>
  )
}

export default BehaviorDescription
