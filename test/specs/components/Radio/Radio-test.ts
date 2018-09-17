import { isConformant } from 'test/specs/commonTests'

import Radio from 'src/components/Radio'

jest.mock('what-input', () => {
  return {
    default: {
      ask: jest.fn(),
    },
  }
})

describe('Radio', () => {
  isConformant(Radio, {
    eventTargets: {
      onChange: 'input',
    },
  })
})
