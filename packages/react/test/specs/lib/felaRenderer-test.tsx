import * as React from 'react'
import { createSnapshot } from 'jest-react-fela'
import { EmptyThemeProvider } from 'test/utils'
import Box from 'src/components/Box/Box'

test('snapshot', () => {
  const snapshot = createSnapshot(
    <EmptyThemeProvider>
      <Box styles={{ color: 'red' }} />
    </EmptyThemeProvider>,
    {},
  )
  expect(snapshot).toMatchSnapshot()
})
