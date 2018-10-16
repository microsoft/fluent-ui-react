const ReactDOMServer = require('react-dom/server')
const { axe } = require('jest-axe')

const { toHaveNoViolations } = require('jest-axe')

type AxeMatcher<R> = jest.Matchers<R> & {
  toHaveNoViolations: () => R
}

interface AxeExpect extends jest.Expect {
  (object: any): AxeMatcher<void>
}

const expectAxe = expect as AxeExpect
expect.extend(toHaveNoViolations)

export default async (jsx: React.ReactNode) => {
  const html = ReactDOMServer.renderToString(jsx)
  const results = await axe(html)
  expectAxe(results).toHaveNoViolations()
}
