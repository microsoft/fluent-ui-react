import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { axe, toHaveNoViolations } from 'jest-axe'
import { MockProvider } from 'test/utils'

type AxeMatcher<R> = jest.Matchers<R> & {
  toHaveNoViolations: () => R
}

interface AxeExpect extends jest.Expect {
  (object: any): AxeMatcher<void>
}

const expectAxe = expect as AxeExpect
expect.extend(toHaveNoViolations)

export default async (jsx: React.ReactElement<any>) => {
  const html = ReactDOMServer.renderToString(React.createElement(MockProvider, {}, jsx))
  const results = await axe(html)
  expectAxe(results).toHaveNoViolations()
}
