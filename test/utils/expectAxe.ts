const { toHaveNoViolations } = require('jest-axe')

type AxeMatcher<R> = jest.Matchers<R> & {
  toHaveNoViolations: () => R
}

interface AxeExpect extends jest.Expect {
  (object: any): AxeMatcher<void>
}

export const expectAxe = expect as AxeExpect
expect.extend(toHaveNoViolations)

export default expectAxe
