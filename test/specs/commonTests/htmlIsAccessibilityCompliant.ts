import * as ReactDOMServer from 'react-dom/server'
import { axe, toHaveNoViolations } from 'jest-axe'
import * as axeCore from 'axe-core'
import { withProvider } from 'test/utils'
import { checks, rules } from './axe-roles'

type AxeMatcher<R> = jest.Matchers<R> & {
  toHaveNoViolations: () => R
}

interface AxeExpect extends jest.Expect {
  (object: any): AxeMatcher<void>
}

const expectAxe = expect as AxeExpect
expect.extend(toHaveNoViolations)

axeCore.configure({ checks, rules })

export default async (jsx: React.ReactElement<any>) => {
  const html = ReactDOMServer.renderToString(withProvider(jsx))
  const results = await axe(html)
  expectAxe(results).toHaveNoViolations()
}
