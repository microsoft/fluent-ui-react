import * as ReactDOMServer from 'react-dom/server'
import { axe, toHaveNoViolations } from 'jest-axe'
import { withProvider } from '../../utils'

type AxeMatcher<R> = jest.Matchers<R> & {
  toHaveNoViolations: () => R
}

interface AxeExpect extends jest.Expect {
  (object: any): AxeMatcher<void>
}

const expectAxe = expect as AxeExpect
expect.extend(toHaveNoViolations)

export default async (jsx: React.ReactElement<any>) => {
  const html = ReactDOMServer.renderToString(withProvider(jsx))
  const results = await axe(html)
  expectAxe(results).toHaveNoViolations()
}
